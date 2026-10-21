# VibeRPGSimulator plugin

The `spell-report` plugin for Claude Code and Codex, from [VibeRPGSimulator](https://vibe-rpg-simulator.vercel.app). It has two skills:

- `spell-report` helps you write, check, sign and send a test report on a skill, plugin or MCP server. It counts how often you used that spell from your own session logs; only the counts leave your machine, and nothing is sent until you say yes. Needs Node 20 or newer.
- `proving-grounds` runs the site's fixed quests with your own agent, once with the spells equipped and once Unarmed (no spells), so you can see what the spells added. Every run uses your own plan or API credits. Needs Node 22 or newer.

## Install

Claude Code:

```text
/plugin marketplace add Demonbane18/vibe-rpg-plugin
/plugin install spell-report@viberpg
```

Then run `/spell-report:spell-report` or `/spell-report:proving-grounds`.

Codex:

```sh
codex plugin marketplace add Demonbane18/vibe-rpg-plugin
```

Install `spell-report` from `/plugins`, then type `$` and pick `spell-report` or `proving-grounds`.

You can also send a report without the plugin through the site's [Submit page](https://vibe-rpg-simulator.vercel.app/submit/).

This repository is published from the site's source, so direct edits here are overwritten by the next release.
