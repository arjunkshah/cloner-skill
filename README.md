# Cloner Skill

Reusable website cloning skill package for agentic coding tools.

This repo started from `JCodesMore/ai-website-cloner-template` and is now packaged so you can install/use the same cloning workflow in:

- Claude Code
- Codex
- Any agent system that can load a Markdown skill file

## Skill Locations

- Primary installable skill (for `npx skills add`): `skills/clone/`
- Claude skill: `.claude/skills/clone-website/SKILL.md`

## What The Skill Does

Given a target URL, the skill:

1. Uses local tooling (`curl`/`wget` and optional local browser automation) to inspect structure, styles, assets, and behavior.
2. Creates auditable research/spec files in `docs/research`.
3. Dispatches focused builder agents/worktrees for sections/components.
4. Reassembles into a high-fidelity Next.js clone (including animations/interactions) and verifies build integrity.

Code quality policy:
- clean, componentized, production-style code
- no scraper-looking output or unreadable style dumps

## Prerequisites

- Node.js 20+
- Local CLI tools (`curl`, `wget`; Playwright optional for JS-heavy sites)
- Git

## Install

```bash
npx skills add https://github.com/arjunkshah/cloner-skill
```

Then invoke:

```text
$clone https://example.com
```

Alternative flow:

```text
$clone
https://example.com
```

## Agent Notes

- `$clone` comes from `skills/clone/agents/openai.yaml`.
- Claude slash-command usage remains supported in repos that use `.claude/skills/clone-website/`:
  - `/clone-website https://example.com`
- For manual installs, copy `skills/clone/` into your local skills directory.

## Repository Structure

```text
.claude/skills/clone-website/   # Claude-native skill
skills/clone/                   # npx-installable primary skill ($clone)
src/                            # Next.js scaffold used by the clone workflow
docs/research/                  # Extraction output/spec files
docs/design-references/         # Screenshots/reference images
scripts/                        # Asset/download helpers
TARGET.md                       # Optional target scope/config
```

## Source Template Attribution

Derived from:
- https://github.com/JCodesMore/ai-website-cloner-template

License remains MIT.
