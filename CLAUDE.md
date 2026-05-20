# megamax-v2 — Project Instructions

## Stack
- Vite + React 19 + TS + Tailwind 4 + Storybook 10 + Radix (`radix-ui` package)
- v2 token system in `src/index.css` (`@theme { }` block — NOT `@theme inline`)
- Storybook dev: `localhost:6010` (background task)
- `npm` cache: ALL npm commands must be prefixed with `env npm_config_cache=/tmp/npm-megamax-cache` — `~/.npm` is root-owned on this machine.

## CSS Studio chat log

This project uses CSS Studio (mounted via `.storybook/preview.tsx`). The MCP
bridge is stateless, so panel chat dies with each session.

**`.claude/cssstudio-chat.md` is the persistent log.**

- **On every session start:** read it before doing anything else. Use it as context.
- **On every turn that touches CSS Studio:** append a new entry following the
  format header at the top of that file. Verbatim user message + the
  selector/story they were on + a short Agent summary + a bulleted `path:line`
  list of edits.
- **Direct panel edits with no chat:** still log them — prefix the subject with
  `Edit batch (no chat): ...`.
- **At session end:** summarize the whole session into the appropriate memory
  file (turn-level detail lives in the log; session-level summary lives in
  `~/.claude/projects/-Users-esteban/memory/project_megamax_ds.md` under the v2
  section).
- **Anti-patterns:** don't dump raw JSON / full diffs / minor refactors of the
  log. Append-only.

## Freeze mode (CSS Studio)

If `cssstudio-freeze.js` ever lands in this repo, swap the preview's
`startStudio()` for `startStudioWithFreeze()` and tell Esteban at session start:
*"Freeze is available — Ctrl+Shift+F"*. Until then, no freeze on v2.

## Token conventions

- All v2 tokens are prefixed `mm-` (color/spacing/text/tracking/size).
- Use `bg-[var(--color-mm-bg)]` and friends — utilities don't exist for these
  arbitrary token names, the arbitrary-value syntax is correct.
- `tailwind-merge` is extended in `src/lib/utils.ts` to register custom
  `text-mm-*` and `tracking-mm-*` class groups. Add new size/tracking tokens
  there too or `cn()` will strip them.

## Storybook organization

- `Foundations/Tokens` — token swatches (opts out of magnify)
- `Primitives/<Component>` — 16 primitives, each with Interactive demo
- `Examples/01..08 · <Card>` — composition proof-of-use (opts out of magnify)
- Default decorator: `.mm-magnify` class boosts text tokens ~1.3× for
  readability. Stories opt out via `parameters: { magnify: false }`.
