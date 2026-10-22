---
name: proving-grounds
description: Run the library's fixed quests with your own harness and spell loadout, compare reliability and effectiveness against an Unarmed control, then include self-measured results in a spell report.
compatibility: Node 22 or newer, on macOS (grading needs its Seatbelt sandbox). Codex or Claude Code runs sealed. OMP runs warded and needs explicit acceptance, because its agent can read OMP's sign-in files. Every run spends the tester's own plan allowance.
---

# Proving Grounds

Use the helper in the sibling spell-report skill. Resolve its installed path first:

```text
node "<spell-report-skill-directory>/scripts/spell-report.mjs" doctor
```

Commands below go after that same `node` invocation. Read the sibling [spell-report skill](../spell-report/SKILL.md) before creating or sending a report. Its consent, signing and privacy rules apply here too.

## Run quests

1. Run `doctor` to check Node, heroes (harnesses), sign-in and sandbox support. Run `quests` to list bundled fixed tasks by school, rank (difficulty), id and summary.
2. Let the tester choose a library spell (`--spell <slug>`), a workflow (`--workflow <slug>`) or a published combo (`--combo <slug-a>+<slug-b>`). The site's `/trials/` page has a “Try this loadout” command for each result. A loadout is the skills given to the agent; nothing is installed globally. Confirm the hero (agent app), weapon (AI model), charge (reasoning effort), quests and number of runs. Every run, including Unarmed controls, spends the tester's own plan allowance.
3. Run with `--control` and explicit `--weapon` and `--charge`. Replace the example values with the chosen library slug, quest id and model id:

   ```text
   trial --spell <library-slug> --quest <quest-id> --hero codex --weapon <model-id> --charge high --cast invoked --runs 3 --control
   ```

   Use `trial --help` for supported flags. A workflow or combo takes the place of `--spell`. `--control` interleaves Unarmed runs with no skills under the same setup. An invoked cast names the equipped skills in the prompt; an ambient cast leaves the choice to the agent. Results and fetched spells stay under `VIBERPG_DATA_DIR`, or `~/.viberpg` by default.

   The arena is the sandbox. Codex and Claude Code run sealed: agent commands have no network, the home folder is hidden and writes stay in the arena; in Claude Code, hooks and skills' inline shell commands are turned off. OMP runs warded: the home folder is hidden except OMP's own folders, so its agent can read OMP's sign-in files and reach the network. An OMP trial therefore needs `--allow-open-arena`; ask the tester first and never add that flag silently. Trials refuse to start outside macOS, because grading runs the agent's code and needs the Seatbelt sandbox. Read safety-screen findings before asking whether to use `--allow-hazards`.

   Screenshots (Scrying) are off by default. Before the batch, ask the tester whether to save a screenshot of each run's output: the agent's final reply, its file changes and which checks passed. Tell them the images stay under their data folder and nothing is shared unless they attach screenshots to a report. Add `--scrying` only after a clear yes. Credentials are always removed from screenshots.

   When a screenshot shows sensitive details (local paths, the user or host name, emails, IP addresses, ids or secrets in URLs), the helper prints an alert naming the run and what it found, and does not save that screenshot. Show the tester the alert word for word. Ask again whether to save such screenshots with those details blurred. Only after a second yes, run `scry --blur`: it saves the withheld screenshots from the runs already made, blurred, without starting new runs. For later batches the tester can also agree up front, and then you pass `--scrying --blur` to `trial`. In a terminal the helper asks both questions itself, with No as the default.
4. Run `trials` to read aggregate results. These are self-measured, not independently verified. Compare the same quest version, hero/version, weapon, charge, arena and machine; a different setup is not a control. Published commands fetch current upstream commits, so check recorded versions and commits before comparing an older result.

## Read results

Terms follow the site's glossary:

- **Cleared** means every hidden check passed. **Instant cast** means one-shot; **channeled** means follow-up prompts were needed. **Fizzled** means checks still failed after the prompt or time limit. A **mishap** is an outside error, such as sign-in, rate limit or crash, excluded from rates.
- **Clear rate** is the pass rate. **Steadiness** is reliability: the Wilson 95% lower bound of clear rate. A few runs support a low number even when every run passed.
- **Buff** is effectiveness: clear-rate percentage points over the matching Unarmed control. A negative buff is a debuff. No matching control means no buff claim.
- **Mastery** is partial credit: average share of checks passed, failed runs included. **Casts** is median prompts needed by cleared runs. **Cast time** is median agent runtime, grading excluded.
- **Mana** is median tokens, cached input included; compare within one hero. **Gold** is estimated API-list-price cost when reported, not subscription billing. **Actions** means tool calls. **Attunement** means the agent opened an equipped skill, found in that run's own log.

## Report results

Follow the spell-report skill to confirm the public spell identity and local match ids, then create a report with the chosen name:

```text
new "<report-directory>" --name "<spell name>" --kind skill --source "<public HTTPS URL>" --match "skill:<id>" --agent codex --submitter "<chosen name>" --trials <library-slug>
```

Repeat `--trials` for more library slugs. It includes cells whose spell, workflow or combo equips that slug, plus matching Unarmed controls. The helper prints how many cells were added and marks their source with the submitter's name. Only aggregates go into the header, never run logs, prompts or local paths. Trial cells include OS and CPU architecture; `--no-environment` only omits the separate local-session environment evidence.

Add `--scrying` to `new` only if the tester wants their saved screenshots in the report. It attaches the latest screenshot of each included cell, up to 6 files and 4 MB in total, and links each one to its cell so the site can show it after the owner imports the report. Open every attached PNG with the tester before sending and remove any they do not want to share.

Fill the report's sections and verdict with the tester's findings. Run `check "<report-directory>/spell-report.md"`, review all cells, files, destination and warnings, then optionally sign following the spell-report skill. A signature attributes the exact report bytes; it does not prove the measurements. Show a local preview with `submit` without `--yes`. Ask explicitly whether to send these files to that destination. Only an explicit yes authorizes `submit ... --yes`; do not silently retry a possibly delivered email.

## Invocation

Claude Code: `/spell-report:proving-grounds`. Codex: `$spell-report:proving-grounds`.
