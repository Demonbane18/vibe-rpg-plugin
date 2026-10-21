---
name: spell-report
description: Write, check, sign and send a structured test report on a skill, plugin or MCP server for Claude Code or Codex to the VibeRPGSimulator curator. Use when someone wants to review a spell, share test results, report limits or submit screenshots with optional GitHub provenance.
compatibility: Node 20 or newer on macOS, Linux or Windows. Optional signing requires the OpenSSH ssh-keygen command. Sending requires an internet connection.
---

# Spell report

Use the bundled helper, not an installed global command:

```text
node "<this-skill-directory>/scripts/spell-report.mjs" --help
```

Resolve the path from this skill's installed directory. Every command below goes after that same `node` invocation. Use `--help` on any command for its flags. The default site endpoint is shown by `--help`; the tester can override it with `--endpoint <site>/api/submit` or `SPELL_REPORT_ENDPOINT`.

## Workflow

1. Confirm the spell's name, kind (`skill`, `plugin` or `mcp_server`), public source link, tested version and which agent they used. Do not guess a version. Ask what name they want on the report; a pseudonym is fine. GitHub username and reply email are optional.
2. Run `spells` to list spell ids and session counts from their own local logs. Ask them which ids describe this spell; shared names can refer to different tools. Do not copy logs into the report. Counts include subagents in their root session, not separate uses.
3. Run `new` in a new report directory, using the confirmed ids:

   ```text
   new "<report-directory>" --name "<spell name>" --kind skill --source "<public HTTPS URL>" --match "skill:<id>" --agent codex --submitter "<chosen name>"
   ```

   Repeat `--match` or `--agent` when needed. Add `--version`, `--github` or `--email` only when supplied. The helper measures usage locally and writes `spell-report.md`; it will not overwrite an existing report. Explain that these counts are self-measured evidence, not independent proof.

   The report records the tester's OS, CPU architecture and harness versions found in their own logs so the curator can compare environments. It may appear with their credit on the spell page. Show this environment with the rest of the report. If they prefer not to share it, create the report with `--no-environment`.
4. Interview the tester. Fill every section in their words: **What I used it for**, **How I tested it**, **Results**, **Problems and limits**, **How to reproduce**, and **Links**. Say when something was not tested. Replace the header's verdict summary with their conclusion. Keep the JSON header valid and preserve the measured evidence.

   Ask for a suggested tier or leave `verdict.tier` as `null`: S = exceptional for this task; A = strong with few limits; B = useful with clear tradeoffs; C = limited or needs substantial help. Their suggestion does not set the curator's published rating.
5. Attach only screenshots or short videos they choose:

   ```text
   attach "<report-directory>/spell-report.md" "<chosen file>" --alt "<what this shows>"
   ```

   Accepted: PNG, JPEG, GIF, WebP, MP4 and WebM. Maximum six attachments and 4 MB for the whole submission, including report and signature. Ask them to crop or compress locally if needed. Check media for private details too.
6. Run `check "<report-directory>/spell-report.md"` and fix blocking problems. Show the complete report, measured counts, every attachment, reply email, destination and any provenance warnings. A local preview is available with `submit "<report-directory>/spell-report.md"` without `--yes`; it sends nothing.
7. Offer optional signing. A valid SSH signature ties these exact report bytes to a signing key; when that key is listed on the claimed GitHub account, the curator can verify that attribution. It does not prove the findings are true. Run `sign "<report-directory>/spell-report.md"` or add `--key "<chosen key path>"`. Never open a private key or ask for a passphrase. If signing fails or needs a passphrase, give the exact manual command printed by the helper for them to run in their own terminal. Never change the report after signing; changes require an unsigned copy and a new signature. Run `check` again.
8. Ask explicitly whether to send these files to this destination. Only an explicit yes authorizes `submit "<report-directory>/spell-report.md" --yes`. Include any agreed endpoint override. Report the returned reference id and signature/GitHub status. On failure, show the error and offer upload at `<site>/submit/`; the helper prints that URL. Do not silently retry a possibly delivered email.

## Privacy

Keep secrets, tokens, private code, client or company names, file paths and prompts out of the report and media. Use public links and short descriptions instead. Do not read credentials or agent configuration. Never install or enable anything for the tester. The helper sends only the report, its optional signature, chosen attachments and optional reply email, never session logs. GitHub verification makes public-key lookups only for a valid signature with a claimed username.

## Invocation

Claude Code: `/spell-report:spell-report`. Codex: `$spell-report:spell-report`, or select this skill from the `$` skill picker. Install through the `viberpg` marketplace; start a new Codex session after installation.
