# Cloner Skill

Reusable website cloning skill package for agentic coding tools.

This repo started from `JCodesMore/ai-website-cloner-template` and is now packaged so you can install/use the same cloning workflow in:

- Claude Code
- Codex
- Any agent system that can load a Markdown skill file

## Skill Locations

- Claude skill: `.claude/skills/clone-website/SKILL.md`
- Generic skill: `skills/clone-website/SKILL.md`

## What The Skill Does

Given a target URL, the skill:

1. Uses browser automation (Chrome MCP) to inspect structure, styles, assets, and behavior.
2. Creates auditable research/spec files in `docs/research`.
3. Dispatches focused builder agents/worktrees for sections/components.
4. Reassembles into a high-fidelity Next.js clone and verifies build integrity.

## Prerequisites

- Node.js 20+
- Chrome MCP/browser automation available to your agent
- Git

## Install And Use

### Claude Code

1. Clone this repo:
   ```bash
   git clone https://github.com/arjunkshah/cloner-skill.git
   ```
2. Either:
   - run from this repo directly with Claude Code, or
   - copy `.claude/skills/clone-website` into your own repo’s `.claude/skills/`
3. Start Claude with Chrome enabled:
   ```bash
   claude --chrome
   ```
4. Invoke the skill with a URL:
   ```
   /clone-website https://example.com
   ```

### Codex

1. Copy the generic skill folder into your Codex skills directory:
   ```bash
   mkdir -p ~/.codex/skills
   cp -R skills/clone-website ~/.codex/skills/
   ```
2. Start Codex in your project and ask it to clone a site, providing the target URL.

### Other Agents

Use `skills/clone-website/SKILL.md` as the base instruction file and adapt trigger wiring for that platform.

## Repository Structure

```text
.claude/skills/clone-website/   # Claude-native skill
skills/clone-website/           # Agent-agnostic skill
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
