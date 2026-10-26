// Expeditions for OMP (oh-my-pi): forwards session, prompt, tool, compaction and subagent events to the local
// Expeditions helper over its private channel, so the game window can follow the session.
//
// Self-contained on purpose: `expeditions setup` copies this one file into OMP's user extensions folder
// (<agent dir>/extensions/expeditions.ts) and rewrites the INSTALL line below. Node built-ins only.
//
// Sources (read 2026-10-26): omp://extensions.md (event surface, ctx.agent, ctx.cwd, handler budgets, raw timers must not
// throw), omp://extension-loading.md (user extensions folder, PI_CODING_AGENT_DIR and PI_CONFIG_DIR), omp://hooks.md, and
// the event types in @oh-my-pi/pi-coding-agent 18.8.3 (src/extensibility/extensions/types.ts and shared-events.ts):
// session_start, session_switch, before_agent_start { prompt }, agent_start {}, tool_execution_start { toolCallId,
// toolName, args }, tool_execution_end { toolCallId, toolName, result, isError }, tool_approval_requested { toolCallId,
// toolName, reason?, approvalMode } and tool_approval_resolved { toolCallId, toolName, approved, reason? } (the tool
// wrapper awaits these, so handlers return at once), agent_end { messages, willContinue }, session_before_compact,
// auto_compaction_start { reason, action }, session_compact, auto_compaction_end { action, aborted, willRetry },
// auto_retry_start { attempt }, session_shutdown. Factories are rebound to every subagent session with
// ctx.agent = { kind: "sub", id, parentId }, and module variables are shared between those bindings.
//
// Live hints (phase, a step label, the working folder's base name) travel only in the request's `live` member, for the
// window's memory; they are never part of an event.
//
// The channel mirrors src/expeditions/channel.ts and paths.ts (tests/expeditions-adapters.test.ts checks the copies):
// one JSON request line, one JSON response line; a Unix socket in the private run/ folder, or a loopback port from
// run/helper.json with a challenge proving both sides hold the local secret before the request is sent.
// Nothing here throws into OMP: handlers only normalize and queue in memory, and the sender runs on a later turn of the
// event loop (setImmediate) with asynchronous file access; both catch everything.

import { spawn } from "node:child_process";
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { constants } from "node:fs";
import { chmod, link, lstat, mkdir, open, readFile, rm, writeFile } from "node:fs/promises";
import { connect, type Socket } from "node:net";
import { homedir } from "node:os";
import { join } from "node:path";

// expeditions:install (setup rewrites this line with the node and expeditions.mjs paths of the install)
const INSTALL: { node: string; cli: string } = { node: "node", cli: "" };

export const CHANNEL = {
  version: 1,
  secretFile: "secret",
  secretBytes: 32,
  socketFile: "run/helper.sock",
  helperFile: "run/helper.json",
  clientLabel: "expeditions-client:",
  helperLabel: "expeditions-helper:",
  requestBytes: 64 * 1024,
  promptChars: 8_000,
  eventsPerRequest: 32,
  timeoutMs: 1_000,
  startTimeoutMs: 3_000,
  queueMax: 256,
} as const;

// Mirrors of src/stats/rules.ts (TEST, SKILL_PATH), src/expeditions/adapters/tools.ts (SHIP, TOOL_ARG_CHARS,
// sanitizeLiveText, projectName, stepFor) and src/shared/expeditions-types.ts (LIVE_LIMITS, Step, LiveHint).
export const TEST =
  /\b(bun test|vitest|jest|pytest|go test|cargo test|(?:npm|pnpm|yarn|bun) (?:run )?test|playwright test|swift test|xcodebuild\b.*\btest|phpunit|rspec|mocha|deno test|dotnet test|mvn test|gradle test)\b/;
export const SKILL_PATH = /skills[\\/]+([a-z0-9][a-z0-9._-]{0,63})[\\/]+SKILL\.md/g;
export const SHIP =
  /\b(?:git\s+push|gh\s+pr\s+(?:create|merge)|(?:npm|pnpm|yarn|bun|cargo)\s+publish|vercel(?:\s+deploy)?\s+--prod|(?:vercel|netlify|wrangler|flyctl|fly|firebase|railway|gcloud(?:\s+[a-z-]+)*?)\s+deploy|terraform\s+apply|kubectl\s+apply)\b/;

export const TOOL_ARG_CHARS = 4_096; // Mirrors tools.ts; never scan oversized arguments for derived kinds or matches.
export const LIVE_LIMITS = { projectChars: 48, targetChars: 64 } as const;

type Kind = "read" | "edit" | "shell" | "test" | "ship" | "web" | "mcp" | "skill" | "subagent" | "other";
type Effort = "none" | "low" | "medium" | "high" | "xhigh" | "max";
type LivePhase = "working" | "tool" | "approval" | "waiting" | "compacting";
export interface Step { kind: Kind; target: string | null }
export interface LiveHint { at: number; phase?: LivePhase; step?: Step | null; project?: string; scope?: "sub"; actor?: string; call?: string }

export const CAPS = { prompt: true, tools: true, skills: true, subagents: true, compaction: true, toolStart: true, model: true };

// OMP's built-in tool names (BUILTIN_TOOL_NAMES in src/tools/builtin-names.ts) plus fetch and browser. MCP tools are
// "mcp__<server>_<tool>"; the server name comes from the result's details.serverName.
export const OMP_TOOLS: Record<string, Kind> = {
  read: "read", grep: "read", glob: "read", find: "read", ast_grep: "read",
  edit: "edit", write: "edit", ast_edit: "edit",
  bash: "shell", eval: "shell",
  web_search: "web", fetch: "web", browser: "web",
  task: "subagent",
};

const EFFORTS: Record<string, Effort> = { off: "none", minimal: "low", low: "low", medium: "medium", high: "high", xhigh: "xhigh", max: "max" };
const RAW_NAME = /^[a-z0-9][a-z0-9._:@/-]{0,99}$/;
const ID_CHARS = 200; // mirrors optId in tools.ts: a longer raw id or tool name is never used as a key or queued

/** A raw id or tool name within ID_CHARS, else undefined: an O(1) guard before any map, hash or scan work. */
function boundedId(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 && value.length <= ID_CHARS ? value : undefined;
}

/** An event before the helper numbers it; the same shape as InboundEvent in src/shared/expeditions-types.ts. */
export type OmpEvent = { sub?: string; dedupe?: string; match?: string } & (
  | { kind: "session_start"; agent: "omp"; caps: typeof CAPS; model: string | null; effort: Effort | null }
  | { kind: "prompt" }
  | { kind: "tool_start"; tool: Kind }
  | { kind: "tool"; tool: Kind; ok: boolean; spell: null }
  | { kind: "turn_end" }
  | { kind: "compaction" }
  | { kind: "subagent_start" }
  | { kind: "subagent_end"; ok: boolean }
  | { kind: "mishap" }
  | { kind: "session_end"; reason: "agent" }
);

export interface OmpInput {
  type: string; // the OMP event name
  event?: unknown; // its payload
  agent: { kind: "main" | "sub"; id: string };
  model?: string | null;
  thinking?: string | null;
  cwd?: string; // the session's working folder; only its sanitized base name leaves normalizeOmp
}

interface Call { tool: Kind; match?: string }
interface Pending extends Call { step: Step } // the sanitized step, so a result without arguments still shows it
export interface OmpState { pending: Map<string, Pending>; subs: Set<string> }

export function newOmpState(): OmpState {
  return { pending: new Map(), subs: new Set() };
}

/** A field of an untrusted object, or undefined. */
function field(value: unknown, key: string): unknown {
  return typeof value === "object" && value !== null ? Reflect.get(value, key) : undefined;
}

/** A string argument within the scan limit, else undefined (tools.ts optLiveString). */
function liveArg(input: unknown, key: string): string | undefined {
  const value = field(input, key);
  return typeof value === "string" && value.length <= TOOL_ARG_CHARS ? value : undefined;
}

/** Window-only labels. Bound raw work before stripping controls, collapsing spaces and clipping the visible name. */
export function sanitizeLiveText(value: unknown, limit: number): string | null {
  if (typeof value !== "string" || value.length > TOOL_ARG_CHARS) return null;
  const text = value.replace(/[\x00-\x1f\x7f-\x9f\u061c\u200e\u200f\u202a-\u202e\u2066-\u2069]/g, "").replace(/\s+/g, " ").trim().slice(0, limit).trim();
  return text || null;
}

function liveBaseName(value: unknown, limit: number): string | null {
  const text = sanitizeLiveText(value, TOOL_ARG_CHARS);
  // A query string or fragment can hold a token (a URL-shaped path), so it never reaches the label.
  const name = text?.split(/[?#]/, 1)[0]?.replace(/\\/g, "/").replace(/\/+$/, "").split("/").pop();
  if (!name || name === "." || name === ".." || /^[a-z]:$/i.test(name)) return null;
  return sanitizeLiveText(name, limit);
}

export function projectName(path: unknown): string | undefined {
  return liveBaseName(path, LIVE_LIMITS.projectChars) ?? undefined;
}

/** Only the safe label for a step crosses the channel; commands and arbitrary arguments never do. */
export function stepFor(call: { tool: Kind; match?: string }, name: string, input: unknown, server?: string): Step {
  if (call.tool === "shell" || call.tool === "test" || call.tool === "ship") return { kind: call.tool, target: null };
  let target: unknown;
  switch (call.tool) {
    case "read":
    case "edit":
      target = liveArg(input, "file_path") ?? liveArg(input, "path") ?? liveArg(input, "notebook_path");
      break;
    case "web": {
      const text = sanitizeLiveText(liveArg(input, "url"), TOOL_ARG_CHARS);
      try {
        const url = new URL(text ?? "");
        if (url.protocol === "https:" || url.protocol === "http:") target = url.hostname;
      } catch {
        // Searches and malformed URLs carry no target.
      }
      break;
    }
    case "mcp": {
      const parts = name.length <= TOOL_ARG_CHARS ? name.split("__", 3) : [];
      target = server ?? (call.match?.startsWith("mcp:") ? call.match.slice(4) : parts.length === 3 ? parts[1] : undefined);
      break;
    }
    case "skill":
      target = call.match?.startsWith("skill:") ? call.match.slice(6) : call.match?.startsWith("command:") ? call.match.slice(8) : liveArg(input, "skill") ?? liveArg(input, "name");
      break;
    case "subagent":
      target = liveArg(input, "subagent_type") ?? liveArg(input, "agent_type") ?? liveArg(input, "agent") ?? liveArg(input, "name");
      break;
    case "other":
      target = name;
      break;
  }
  return { kind: call.tool, target: liveBaseName(target, LIVE_LIMITS.targetChars) };
}

function rawId(kind: "skill" | "mcp", name: string | undefined): string | undefined {
  if (name !== undefined && name.length > TOOL_ARG_CHARS) return undefined;
  const lower = name?.toLowerCase();
  return lower !== undefined && RAW_NAME.test(lower) ? `${kind}:${lower}` : undefined;
}

function skillRead(text: string): string | undefined {
  if (text.length > TOOL_ARG_CHARS) return undefined;
  for (const match of text.matchAll(SKILL_PATH)) {
    const id = rawId("skill", match[1]);
    if (id !== undefined) return id;
  }
  return undefined;
}

/** Kind and raw spell id of a tool call from its name and arguments. Nothing from the arguments leaves this function. */
export function ompCall(name: string, args: unknown): Call {
  if (name.startsWith("mcp__")) return { tool: "mcp" };
  const tool = Object.hasOwn(OMP_TOOLS, name) ? OMP_TOOLS[name] ?? "other" : "other";
  if (tool === "read") {
    const path = field(args, "path");
    if (typeof path !== "string" || path.length > TOOL_ARG_CHARS) return { tool };
    const match = path.startsWith("skill://") ? rawId("skill", path.slice(8).split(/[/:]/, 1)[0]) : skillRead(path);
    return match === undefined ? { tool } : { tool: "skill", match };
  }
  if (name === "bash") {
    const command = field(args, "command");
    if (typeof command !== "string" || command.length > TOOL_ARG_CHARS) return { tool };
    const match = skillRead(command);
    if (match !== undefined) return { tool: "skill", match };
    return { tool: TEST.test(command) ? "test" : SHIP.test(command) ? "ship" : "shell" };
  }
  return { tool };
}

// ponytail: only the last 16 messages are searched, so no handler walks a long history; the final assistant message
// normally comes last. Widen it if aborted or failed turns start reading as finished.
const STOP_SCAN = 16;

function lastStop(messages: unknown): unknown {
  if (!Array.isArray(messages)) return undefined;
  for (let index = messages.length - 1; index >= Math.max(0, messages.length - STOP_SCAN); index--) {
    const message: unknown = messages[index];
    if (field(message, "role") === "assistant") return field(message, "stopReason");
  }
  return undefined;
}

// Events that only move the live phase. They never announce a subagent: some can arrive after its turn ended.
const LIVE_ONLY = ["agent_start", "tool_approval_requested", "tool_approval_resolved", "session_before_compact", "auto_compaction_start", "auto_compaction_end"];

/**
 * OMP event -> events and a live hint (without its clock) for the helper. Pure apart from `state`: tool calls started
 * but not ended, and subagents seen. `sub`, `dedupe` and the hint's `actor` and `call` are raw agent and tool-call ids
 * here; the sender hashes them before anything leaves. A subagent's hints are only its approvals and their resolution,
 * marked scope "sub" with the subagent as `actor`.
 */
export function normalizeOmp(input: OmpInput, state: OmpState): { events: OmpEvent[]; prompt?: string; live?: Omit<LiveHint, "at"> } {
  const sub = input.agent.kind === "sub" ? input.agent.id : undefined;
  const events: OmpEvent[] = [];
  const quiet = input.type === "agent_end" || input.type === "session_shutdown" || LIVE_ONLY.includes(input.type);
  if (sub !== undefined && !quiet && !state.subs.has(sub)) {
    state.subs.add(sub);
    events.push({ kind: "subagent_start", sub });
  }
  const event = input.event;
  switch (input.type) {
    case "session_start": {
      if (sub !== undefined) return { events };
      const thinking = input.thinking ?? "";
      const effort = Object.hasOwn(EFFORTS, thinking) ? EFFORTS[thinking] ?? null : null;
      const model = typeof input.model === "string" && /^[^\x00-\x1f\x7f]{1,80}$/.test(input.model) ? input.model : null;
      events.push({ kind: "session_start", agent: "omp", caps: CAPS, model, effort });
      return { events, live: { phase: "waiting", project: projectName(input.cwd) } };
    }
    case "before_agent_start": {
      if (sub !== undefined) return { events };
      const prompt = field(event, "prompt");
      events.push({ kind: "prompt" });
      return {
        events,
        prompt: typeof prompt === "string" ? prompt.slice(0, CHANNEL.promptChars) : undefined,
        live: { phase: "working", project: projectName(input.cwd) },
      };
    }
    case "agent_start":
      // The prompt itself came with before_agent_start.
      return sub === undefined ? { events, live: { phase: "working" } } : { events };
    case "tool_execution_start": {
      const id = boundedId(field(event, "toolCallId"));
      const name = boundedId(field(event, "toolName"));
      if (name === undefined) return { events };
      const args = field(event, "args");
      const call = ompCall(name, args);
      const step = stepFor(call, name, args);
      if (id !== undefined) {
        state.pending.set(id, { ...call, step });
        // ponytail: drops the oldest of 256 unfinished calls; raise it if long parallel batches lose their kinds.
        if (state.pending.size > 256) state.pending.delete(state.pending.keys().next().value ?? "");
      }
      events.push({ kind: "tool_start", tool: call.tool, sub });
      return sub === undefined ? { events, live: { phase: "tool", step, call: id } } : { events };
    }
    case "tool_execution_end": {
      const id = boundedId(field(event, "toolCallId"));
      const name = boundedId(field(event, "toolName"));
      if (name === undefined) return { events };
      const started = id === undefined ? undefined : state.pending.get(id);
      if (id !== undefined) state.pending.delete(id);
      const call = started ?? ompCall(name, undefined);
      const details = field(field(event, "result"), "details");
      const exitCode = field(details, "exitCode");
      const server = field(details, "serverName");
      const match = call.match ?? (call.tool === "mcp" && typeof server === "string" ? rawId("mcp", server) : undefined);
      const ok = field(event, "isError") !== true && (typeof exitCode !== "number" || exitCode === 0);
      events.push({ kind: "tool", tool: call.tool, ok, spell: null, match, sub, dedupe: id });
      if (sub !== undefined) return { events };
      // Results carry no arguments: the start's step stands unless the result names more (an MCP server).
      const step = stepFor({ tool: call.tool, match }, name, undefined, typeof server === "string" ? server : undefined);
      return { events, live: { phase: "working", step: step.target === null && started !== undefined ? started.step : step, call: id } };
    }
    case "tool_approval_requested": {
      // No arguments here: the step comes from the call's start, else from the tool name alone.
      const id = boundedId(field(event, "toolCallId"));
      const name = boundedId(field(event, "toolName"));
      const started = id === undefined ? undefined : state.pending.get(id);
      const step = started?.step ?? (name === undefined ? undefined : stepFor(ompCall(name, undefined), name, undefined));
      return { events, live: { phase: "approval", step, scope: sub === undefined ? undefined : "sub", actor: sub, call: id } };
    }
    case "tool_approval_resolved": {
      const id = boundedId(field(event, "toolCallId"));
      return { events, live: { phase: "working", scope: sub === undefined ? undefined : "sub", actor: sub, call: id } };
    }
    case "agent_end": {
      if (field(event, "willContinue") === true) return { events };
      const stop = lastStop(field(event, "messages"));
      if (sub !== undefined) {
        if (state.subs.delete(sub)) events.push({ kind: "subagent_end", ok: stop !== "error" && stop !== "aborted", sub });
        return { events };
      }
      if (stop === "error") events.push({ kind: "mishap" });
      // An aborted turn is the player's interrupt: neither a finished turn nor a Mishap.
      else if (stop !== "aborted") events.push({ kind: "turn_end" });
      return { events, live: { phase: "waiting" } };
    }
    case "session_before_compact":
    case "auto_compaction_start":
      return sub === undefined ? { events, live: { phase: "compacting" } } : { events };
    case "session_compact":
      events.push({ kind: "compaction", sub });
      return sub === undefined ? { events, live: { phase: "working" } } : { events };
    case "auto_compaction_end":
      // session_compact already counted the compaction; this only ends the phase.
      return sub === undefined ? { events, live: { phase: "working" } } : { events };
    case "auto_retry_start":
      // The first retry of a provider error is the Mishap; later attempts are the same pause.
      if (sub === undefined && field(event, "attempt") === 1) events.push({ kind: "mishap" });
      return { events };
    case "session_shutdown":
      if (sub === undefined) events.push({ kind: "session_end", reason: "agent" });
      else if (state.subs.delete(sub)) events.push({ kind: "subagent_end", ok: false, sub });
      return { events };
    default:
      return { events };
  }
}

// ---------------------------------------------------------------------------------------------------------------
// Channel client

interface Request {
  v: 1;
  agent: "omp";
  route: string;
  caps: typeof CAPS;
  events: OmpEvent[];
  prompt?: string;
  live?: LiveHint;
}

function dataHome(): string {
  return process.env.EXPEDITIONS_HOME || join(process.env.VIBERPG_DATA_DIR || join(homedir(), ".viberpg"), "expeditions");
}

function mac(secret: Buffer, text: string): string {
  return createHmac("sha256", secret).update(text).digest("hex");
}

async function ensureClientHome(home: string): Promise<void> {
  if (!process.getuid) return; // Windows keeps the existing filesystem behaviour.
  for (const path of [home, join(home, "run")]) {
    await mkdir(path, { recursive: true, mode: 0o700 });
    const info = await lstat(path);
    if (!info.isDirectory() || info.uid !== process.getuid()) throw new Error(`${path} is not a folder you own.`);
    if ((info.mode & 0o077) !== 0) await chmod(path, 0o700);
  }
}

async function readSecret(path: string): Promise<Buffer | null> {
  if (!process.getuid) return readFile(path).catch(() => null);
  const handle = await open(path, constants.O_RDONLY | constants.O_NOFOLLOW | constants.O_NONBLOCK).catch((error: unknown) => {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return null;
    throw error;
  });
  if (handle === null) return null;
  try {
    const info = await handle.stat();
    if (!info.isFile() || info.uid !== process.getuid() || (info.mode & 0o077) !== 0 || info.size !== CHANNEL.secretBytes) {
      throw new Error(`${path} is not a private ${CHANNEL.secretBytes}-byte file you own.`);
    }
    const bytes = await handle.readFile();
    if (bytes.length !== CHANNEL.secretBytes) throw new Error("damaged secret");
    return bytes;
  } finally {
    await handle.close();
  }
}

/** The local secret, created on first use the same way the helper does (a temp file linked into place). */
export async function loadSecret(home: string): Promise<Buffer> {
  await ensureClientHome(home);
  const path = join(home, CHANNEL.secretFile);
  const existing = await readSecret(path);
  if (existing?.length === CHANNEL.secretBytes) return existing;
  await mkdir(home, { recursive: true, mode: 0o700 });
  const bytes = randomBytes(CHANNEL.secretBytes);
  const temporary = `${path}.${randomBytes(8).toString("hex")}.tmp`;
  await writeFile(temporary, bytes, { mode: 0o600, flag: "wx" });
  try {
    await link(temporary, path);
    return bytes;
  } catch {
    const winner = await readSecret(path);
    if (winner?.length !== CHANNEL.secretBytes) throw new Error("damaged secret");
    return winner;
  } finally {
    await rm(temporary, { force: true });
  }
}

/** Bounded response frames, including the challenge and proof on TCP. */
function lineReader(socket: Socket, maxFrames: number): (deadline: number) => Promise<string | null> {
  let buffer = "";
  let closed = false;
  let bytes = 0;
  let frames = 0;
  let wake: (() => void) | null = null;
  socket.setEncoding("utf8");
  socket.on("data", (chunk: string) => {
    if (closed) return;
    bytes += Buffer.byteLength(chunk);
    for (let at = chunk.indexOf("\n"); at !== -1 && frames <= maxFrames; at = chunk.indexOf("\n", at + 1)) frames++;
    if (bytes > maxFrames * (CHANNEL.requestBytes + 1) || frames > maxFrames) {
      buffer = "";
      closed = true;
      socket.destroy();
      wake?.();
      return;
    }
    buffer += chunk;
    wake?.();
  });
  socket.on("close", () => {
    closed = true;
    wake?.();
  });
  return async (deadline) => {
    for (;;) {
      const end = buffer.indexOf("\n");
      if (end >= 0) {
        const line = buffer.slice(0, end);
        buffer = buffer.slice(end + 1);
        return Buffer.byteLength(line) <= CHANNEL.requestBytes ? line : null;
      }
      if (closed || Buffer.byteLength(buffer) > CHANNEL.requestBytes || Date.now() >= deadline) return null;
      const waited = Promise.withResolvers<void>();
      wake = waited.resolve;
      const timer = setTimeout(waited.resolve, Math.max(1, deadline - Date.now()));
      await waited.promise;
      clearTimeout(timer);
      wake = null;
    }
  };
}

function parse(line: string | null): unknown {
  try {
    return line === null ? null : JSON.parse(line);
  } catch {
    return null;
  }
}

const HEX64 = /^[0-9a-f]{64}$/;
const sockets = new Set<Socket>();

/** One exchange: "sent" when the helper answered, "absent" when nobody (or an impostor) is listening, "failed" when
 * the request may have arrived but no answer came back (never resend those: the helper may have applied them). */
async function attempt(home: string, secret: Buffer, line: string, deadline: number): Promise<"sent" | "absent" | "failed"> {
  await ensureClientHome(home);
  let port: number | null = null;
  try {
    const value = field(JSON.parse(await readFile(join(home, CHANNEL.helperFile), "utf8")), "channelPort");
    if (typeof value === "number" && Number.isInteger(value) && value > 0 && value < 65536) port = value;
  } catch {
    // no helper.json: the Unix socket, if any
  }
  if (port === null && process.platform === "win32") return "absent";
  if (port === null && process.getuid) {
    try {
      const endpoint = await lstat(join(home, CHANNEL.socketFile));
      if (!endpoint.isSocket() || endpoint.uid !== process.getuid() || (endpoint.mode & 0o077) !== 0) return "absent";
    } catch {
      return "absent";
    }
  }
  const socket = port === null ? connect(join(home, CHANNEL.socketFile)) : connect({ host: "127.0.0.1", port });
  sockets.add(socket);
  socket.on("error", () => {}); // reported through "close"; an unhandled "error" would crash OMP
  const timer = setTimeout(() => socket.destroy(), Math.max(1, deadline - Date.now()));
  try {
    const connected = Promise.withResolvers<boolean>();
    socket.once("connect", () => connected.resolve(true));
    socket.once("close", () => connected.resolve(false));
    if (!(await connected.promise)) return "absent";
    const next = lineReader(socket, port === null ? 1 : 3);
    if (port !== null) {
      const challenge = field(parse(await next(deadline)), "challenge");
      if (typeof challenge !== "string" || !HEX64.test(challenge)) return "absent";
      const nonce = randomBytes(32).toString("hex");
      socket.write(`${JSON.stringify({ nonce, proof: mac(secret, `${CHANNEL.clientLabel}${challenge}:${nonce}`) })}\n`);
      const proof = field(parse(await next(deadline)), "proof");
      const expected = Buffer.from(mac(secret, `${CHANNEL.helperLabel}${nonce}:${challenge}`), "hex");
      // Not our helper: never send it the request.
      if (typeof proof !== "string" || !HEX64.test(proof) || !timingSafeEqual(Buffer.from(proof, "hex"), expected)) return "absent";
    }
    socket.write(line);
    return parse(await next(deadline)) === null ? "failed" : "sent";
  } finally {
    clearTimeout(timer);
    socket.destroy();
    sockets.delete(socket);
  }
}

/** One observation as its handler queued it, after bounded in-memory work only. `session` is the raw id whose route
 * the request takes; the ids in `events` and `live` stay raw (each within ID_CHARS) until the sender hashes them. */
interface Observation {
  at: number;
  session: string;
  events: OmpEvent[];
  prompt?: string;
  live?: Omit<LiveHint, "at">;
}

const sender = {
  queue: [] as Observation[],
  running: false, // a run is scheduled or in progress
  stopped: false,
  lastSpawn: 0,
  secret: null as Buffer | null,
  sessions: new Map<string, string>(), // OMP agent registry id -> raw id of the session whose run it belongs to
  state: newOmpState(),
};

function spawnHelper(): void {
  if (INSTALL.cli === "" || Date.now() - sender.lastSpawn < 30_000) return;
  sender.lastSpawn = Date.now();
  const child = spawn(INSTALL.node, [INSTALL.cli, "helper"], { detached: true, stdio: "ignore", windowsHide: true });
  child.on("error", () => {});
  child.unref();
}

async function deliver(home: string, secret: Buffer, request: Request): Promise<void> {
  const line = `${JSON.stringify(request)}\n`;
  if (Buffer.byteLength(line) > CHANNEL.requestBytes) return;
  // Only events start a helper: a live-only request (no events) or a lone session_end never does. Anything else may,
  // with a little longer to wait.
  const liveOnly = request.events.length === 0;
  const start = !liveOnly && request.events.some((event) => event.kind !== "session_end");
  const deadline = Date.now() + (start ? CHANNEL.startTimeoutMs : CHANNEL.timeoutMs);
  for (let spawned = false; ;) {
    const result = await attempt(home, secret, line, deadline);
    if (result !== "absent" || !start || Date.now() + 50 >= deadline) return;
    if (!spawned) {
      spawned = true;
      spawnHelper();
    }
    const pause = Promise.withResolvers<void>();
    setTimeout(pause.resolve, 50);
    await pause.promise;
  }
}

/** Off the handler: loads the secret, hashes the route and every raw id, then delivers. */
async function send(item: Observation): Promise<void> {
  const home = dataHome();
  const secret = (sender.secret ??= await loadSecret(home));
  const route = mac(secret, `omp:${item.session}`).slice(0, 16);
  // One opaque key per id wherever it appears: the events' sub and dedupe, the hint's actor and call.
  const opaque = (id: string | undefined) => (id === undefined ? undefined : mac(secret, `omp:${route}/${id}`).slice(0, 16));
  const events = item.events.map((event) => ({ ...event, sub: opaque(event.sub), dedupe: opaque(event.dedupe) }));
  const live = item.live === undefined ? undefined : { ...item.live, at: item.at, actor: opaque(item.live.actor), call: opaque(item.live.call) };
  await deliver(home, secret, { v: CHANNEL.version, agent: "omp", route, caps: CAPS, events, prompt: item.prompt, live });
}

async function pump(): Promise<void> {
  try {
    for (let item = sender.queue.shift(); item !== undefined && !sender.stopped; item = sender.queue.shift()) {
      try {
        await send(item);
      } catch {
        // dropped: the game misses one event, the agent never notices
      }
    }
  } finally {
    sender.running = false;
  }
}

/** Handler side: in-memory only. The sender starts on a later turn of the event loop, never inside the handler (an
 * async function called directly runs up to its first await, file work included, before the handler returns). */
function enqueue(item: Observation): void {
  if ((item.events.length === 0 && item.live === undefined) || sender.stopped) return;
  // ponytail: a full queue drops new events; a stuck helper is the only way to fill 256 requests.
  if (sender.queue.length >= CHANNEL.queueMax) return;
  sender.queue.push(item);
  if (sender.running) return;
  sender.running = true; // claimed now, so the shutdown wait also covers a run that has not started yet
  setImmediate(() => void pump().catch(() => {}));
}

// ---------------------------------------------------------------------------------------------------------------
// OMP binding. Only the members used here; OMP passes its full ExtensionAPI and ExtensionContext.

interface OmpContext {
  sessionManager?: { getSessionId?(): unknown };
  agent?: { kind?: unknown; id?: unknown; parentId?: unknown };
  model?: { id?: unknown };
  cwd?: unknown;
}

interface OmpApi {
  on(event: string, handler: (event: unknown, ctx: OmpContext) => unknown): void;
  getThinkingLevel?(): unknown;
}

interface Agent { kind: "main" | "sub"; id: string; parentId: string | undefined }

/** The agent behind a handler, or null when its id is too long to keep. */
function identity(ctx: OmpContext): Agent | null {
  const agent = ctx.agent;
  const id = typeof agent?.id === "string" ? agent.id : "Main";
  if (id.length > ID_CHARS) return null;
  return { kind: agent?.kind === "sub" ? "sub" : "main", id, parentId: boundedId(agent?.parentId) };
}

/** The raw id of the session an agent belongs to: its own for the main agent, its parent's for a subagent. Resolved in
 * handler order and never hashed here, so a switch's old and new sessions take the events around them. */
function sessionOf(ctx: OmpContext, agent: Agent, fresh: boolean): string | null {
  const known = fresh ? undefined : sender.sessions.get(agent.id);
  if (known !== undefined) return known;
  const parent = agent.kind === "sub" && agent.parentId !== undefined ? sender.sessions.get(agent.parentId) : undefined;
  const own = boundedId(ctx.sessionManager?.getSessionId?.());
  const session = parent ?? own;
  if (session === undefined) return null;
  sender.sessions.set(agent.id, session);
  return session;
}

/** `at` is the handler's clock at entry, read before anything else. Normalizes and queues; the sender does the rest. */
function forward(pi: OmpApi, type: string, event: unknown, ctx: OmpContext, at: number, fresh = false): void {
  const agent = identity(ctx);
  if (agent === null) return;
  const session = sessionOf(ctx, agent, fresh);
  if (session === null) return;
  const model = ctx.model?.id;
  const thinking = type === "session_start" ? pi.getThinkingLevel?.() : undefined;
  const result = normalizeOmp(
    {
      type,
      event,
      agent,
      model: typeof model === "string" ? model : null,
      thinking: boundedId(thinking) ?? null,
      cwd: typeof ctx.cwd === "string" ? ctx.cwd : undefined,
    },
    sender.state,
  );
  enqueue({ at, session, events: result.events.slice(0, CHANNEL.eventsPerRequest), prompt: result.prompt, live: result.live });
}

const FORWARDED = ["session_start", "before_agent_start", "tool_execution_start", "tool_execution_end", "agent_end", "session_compact", "auto_retry_start", ...LIVE_ONLY];

export default function expeditions(pi: OmpApi): void {
  for (const type of FORWARDED) {
    pi.on(type, (event, ctx) => {
      const at = Date.now();
      try {
        forward(pi, type, event, ctx, at);
      } catch {
        // never break the session for the game
      }
    });
  }
  // /new, /resume and forks: the old session ends and a new one starts.
  pi.on("session_switch", (event, ctx) => {
    const at = Date.now();
    try {
      if (identity(ctx)?.kind !== "main") return;
      forward(pi, "session_shutdown", event, ctx, at);
      forward(pi, "session_start", event, ctx, at, true);
    } catch {
      // never break the session for the game
    }
  });
  pi.on("session_shutdown", async (event, ctx) => {
    const at = Date.now();
    try {
      forward(pi, "session_shutdown", event, ctx, at);
      if (identity(ctx)?.kind !== "main") return;
      // Shutdown handlers get 2 seconds; give the last events 1.5 of them, then stop and close every connection.
      const deadline = Date.now() + 1_500;
      while ((sender.running || sender.queue.length > 0) && Date.now() < deadline) {
        const pause = Promise.withResolvers<void>();
        setTimeout(pause.resolve, 25);
        await pause.promise;
      }
      sender.stopped = true;
      sender.queue.length = 0;
      for (const socket of sockets) socket.destroy();
    } catch {
      // never break the session for the game
    }
  });
}
