# Clone Skill

Use this skill when the user wants to clone, replicate, reverse-engineer, or rebuild a website locally.

Invocation:
- `$clone <target-url>`
- or `$clone` followed by a second message containing just the URL

## Core Behavior

When invoked, take the provided URL and perform an end-to-end local clone workflow. Do not require MCP services.

- Use local CLI tools and code changes directly in the workspace.
- Default to rebuilding in this project (Next.js scaffold) unless the user requests a different stack.
- Use Tailwind CSS as the default styling approach unless the user explicitly requests another system.
- Preserve visual structure, content, spacing, typography, and behavior as closely as practical.
- Preserve animation behavior (timing, easing, delays, keyframes, scroll triggers) as closely as practical.
- Prefer real extracted content/assets over invented placeholders.

## Input Rules

1. If URL is missing, ask for exactly one URL.
2. If URL is invalid or unreachable, report the failure and stop.
3. If URL is behind auth/paywall/CAPTCHA, clone only publicly accessible parts and state limitations.

## Local-Only Tooling (No MCP)

Use local tools in this order:

1. `curl` for raw HTML fetch and headers
2. `wget` (or equivalent) for asset mirroring when useful
3. local browser automation (Playwright/Puppeteer) only if needed for JS-rendered content
4. Node scripts for asset normalization and download cleanup

Do not block on external MCP availability.

## Workflow

### 1. Recon

- Fetch the target HTML and detect stack hints (framework, scripts, CSS sources, fonts).
- Capture key pages in scope (default: homepage unless user asks for more).
- Enumerate assets: images, videos, SVGs, fonts, favicons, manifests.
- Map major page sections and reusable components.

Write findings to:
- `docs/research/RECON.md`
- `docs/research/PAGE_TOPOLOGY.md`

### 2. Asset Intake

- Download assets to `public/` with stable local paths.
- Preserve folder semantics (`images/`, `videos/`, `seo/`, `fonts/` as needed).
- Create/update a deterministic downloader script when practical:
  - `scripts/download-assets.mjs`

Write asset inventory to:
- `docs/research/ASSETS.md`

### 3. Rebuild

- Implement the cloned page in `src/app/page.tsx` and supporting components.
- Use Tailwind utility classes for most styling and layout.
- Add/update design tokens, keyframes, and shared utilities in `src/app/globals.css`.
- Create reusable components in `src/components/` when section complexity warrants.
- Create TS types in `src/types/` for structured content.
- Keep the codebase buildable at each step.

### 4. Behavior Fidelity

- Recreate visible interactions (hover, transitions, responsive layout, sticky/fixed elements).
- Recreate motion system details: durations, easings, delays, transforms, keyframes, and stagger patterns.
- Recreate scroll-driven animations (reveal-on-scroll, parallax, sticky transitions, progress-linked effects) when present.
- For complex JS behavior, implement pragmatic equivalents with clear comments.
- If exact behavior cannot be replicated locally, document what differs.

Write behavior notes to:
- `docs/research/BEHAVIORS.md`

### 5. Verify

- Run `npm run build`.
- If available, run lint/type checks.
- Report what was cloned, what was approximated, and remaining gaps.

## Quality Bar

- No broken imports, type errors, or non-compiling output.
- Avoid placeholder lorem text when real content is extractable.
- Maintain semantic HTML and reasonable accessibility attributes.
- Keep Tailwind usage maintainable; extract repeating patterns into reusable components/variants.
- Do not output scraper-style code dumps (massive inline styles, hashed class copies, unreadable DOM mirrors).
- Produce clean production-quality code: small components, clear names, shared tokens, and minimal duplication.
- Animation code must be intentional and readable (centralized keyframes/utilities where possible).

## Output Contract

At completion, provide:

1. Files changed and why
2. Build/test status
3. Known fidelity gaps
4. Next actions (optional)

## Safety + Legal

- Clone only content the user is authorized to reuse.
- Do not bypass authentication, paywalls, or anti-bot protections.
- If blocked by access controls, stop and explain clearly.
