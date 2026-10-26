---
name: expeditions
description: Start a local pixel-art battle alongside an agent session. Use when someone says "start my expedition", "open the expedition window", "turn Guide mode on", wants manual play, or asks an agent without hooks to mark a task's start, progress and finish.
compatibility: Node 22 or newer on macOS, Linux or Windows. Live hooks support Claude Code, Codex, OMP and Gemini CLI. Any agent with a local shell can mark progress; cloud agents use the local window's manual controls.
---

# Expeditions

Use the bundled helper, not an installed global command:

```text
node "<this-skill-directory>/../../scripts/expeditions.mjs" start
```

Resolve the path from this skill's installed directory. Every command below uses that same script. Never guess a global `expeditions` command or copy prompt text into a command.

## Open and manage the window

When asked to start an expedition or open its window, run `start`. It starts the local helper if needed and opens the window. Live hooks then follow the agent's work. The window's recommendation card shows published trial evidence without adding anything to the conversation.

```text
node "<this-skill-directory>/../../scripts/expeditions.mjs" open
node "<this-skill-directory>/../../scripts/expeditions.mjs" status
node "<this-skill-directory>/../../scripts/expeditions.mjs" stop
```

`open` opens the window. `status` shows the helper and agent setup. `stop` stops the helper. Never keep an agent working, retry a task or make extra tool calls to advance a battle.

## Guide mode

Guide mode is off by default. Turn it on only when the player asks:

```text
node "<this-skill-directory>/../../scripts/expeditions.mjs" guide on
node "<this-skill-directory>/../../scripts/expeditions.mjs" guide off
```

For Claude Code and Codex, Guide mode can add one short trial-backed note on the first prompt of a session. That note uses conversation tokens; its size depends on the recommendation. It stays silent for classes without a measured benefit. Ordinary observation hooks and the card in the window cost no model tokens. Reading this skill and running its commands can use the agent's normal tokens.

## Agents without hooks

Use these marks only when live hooks are not already following this session. Start when the player begins the task, mark progress only after a real step finishes, and mark done when the task ends:

```text
node "<this-skill-directory>/../../scripts/expeditions.mjs" mark start
node "<this-skill-directory>/../../scripts/expeditions.mjs" mark progress
node "<this-skill-directory>/../../scripts/expeditions.mjs" mark done
```

An optional `--class <slug>` selects a known library class. If unsure, leave it out and let the player pick in the window. Marks cannot report which tools or spells the agent used. Tell the player this is coarse progress, not a live tool feed. Never invent progress or report that a trial passed from the player's verdict.

## Manual play

For a cloud agent without a local event feed, open the window with `start`. The player chooses a class and starts a manual expedition, presses Progress after a real step, and picks Cleared, Partly, Fizzled or Skip when asked how the work went. The cloud agent does not connect to the helper.

## Setup and updates

Claude Code installs `expeditions@viberpg` from the project's marketplace. Codex installs `expeditions` from `/plugins` and the player approves its hooks in `/hooks`; Codex asks again after an update. OMP and Gemini CLI use the bundled setup:

```text
node "<this-skill-directory>/../../scripts/expeditions.mjs" setup --agent omp
node "<this-skill-directory>/../../scripts/expeditions.mjs" setup --agent gemini
node "<this-skill-directory>/../../scripts/expeditions.mjs" update
```

Setup previews its changes. Apply them only after the player agrees, by adding `--yes`; `--agent all` covers both OMP and Gemini CLI. Updates happen only when requested. Update a marketplace install through its plugin manager, or pull the public plugin repository, then run `update` to refresh setup for installed agents.

## Privacy

Expeditions classifies the first prompt in memory on this machine and drops its text. It never saves prompt text, tool arguments or output, file paths, account ids, raw agent session ids or unknown spell names. Only checked game events and collection progress stay in the local save, normally `~/.viberpg/expeditions`. The helper serves the window on `127.0.0.1`. It may download public library data and spell icons, but uploads no session data. The agent still sends prompts to its own model provider as usual.

Hooks fail open and stay silent unless Guide mode returns its short note. Do not read logs or credentials to fill gaps. An agent's missing capability means "not visible", never "unused".

## Uninstall

Remove Claude Code or Codex's Expeditions plugin through that agent's plugin manager. Remove the setup added for OMP or Gemini CLI with:

```text
node "<this-skill-directory>/../../scripts/expeditions.mjs" uninstall --agent all
```

Review the preview, then repeat with `--yes` if the player agrees. Run `stop` to close the helper. Uninstall keeps the local save; deleting saved progress needs the player's separate request.

## Invocation

Claude Code: `/expeditions:expeditions`. Codex: `$expeditions:expeditions`, or select this skill from the `$` picker. For another agent, load this skill from the installed plugin or a clone of the public plugin repository so its relative script path still works.
