# megamax-v2

Brutalist design system for the LMK / Megamax universe — Vol. 2.

**Stack:** Vite · React 19 · TypeScript · Tailwind 4 · Storybook 10 · Radix.

## Quick start

```sh
npm install
npm run storybook   # → http://localhost:6010
```

If `npm install` fails with EACCES (root-owned cache):

```sh
env npm_config_cache=/tmp/npm-megamax-cache npm install
```

## Layout

```
src/
├── index.css                       # token system (@theme block, mm-* prefix)
├── components/
│   ├── megamax/                    # 39 brutalist primitives
│   └── ui/                         # Radix wrappers (dropdown-menu, tooltip, …)
├── lib/
│   ├── utils.ts                    # cn() + tailwind-merge custom groups
│   └── dotmatrix-*                 # animated dot-matrix engine
└── stories/
    ├── Foundations.stories.tsx     # live token reference (start here!)
    ├── primitives/                 # one story per component
    └── *.stories.tsx               # composition examples (Examples/01..11)
```

## Token conventions

- All tokens prefixed `mm-`. Live in `src/index.css` `@theme { }` block (NOT `@theme inline`).
- Consume via arbitrary-value syntax: `bg-[var(--color-mm-bg)]`, `gap-(--spacing-mm-8)`, `text-mm-tiny`.
- `tailwind-merge` extended in `src/lib/utils.ts` — add new `text-mm-*` / `tracking-mm-*` class groups there or `cn()` will strip them.
- `.mm-magnify` Storybook decorator scales tokens ~1.3× for desk readability. Components consume new values in real pixel space (no CSS zoom hacks). **If you tokenize a component, swap all related dimensions together** or proportions will break in magnify mode.

## Where to look

- Token reference: open `Foundations/Tokens` in Storybook.
- Component instructions for Claude: `CLAUDE.md` at repo root.
- CSS Studio chat log (per-machine state, may diverge): `.claude/cssstudio-chat.md`.

## Three progress-affordance primitives — don't conflate

- `ProgressBar` — solid fill + 3×3 pixel dither at edge (Figma 40:1577)
- `ScanProgressBar` — same visual, animated scan loop
- `SegmentedProgressBar` — 27-cell VU-meter row (Figma 216:911)

## Useful patterns

- **`mm-pixel-icon` utility class** — apply to any wrapper holding `@nsmr/pixelart-react` icons. The library inconsistently sets `fill="currentColor"`; this class forces inheritance + crisp edges. See class definition in `src/index.css`.
- **`data-slot="..."` on every component** — gives consumers reliable CSS hooks and test selectors.
- **`cva`** for variant systems (button, icon-button, tag, dropdown-pill, nav-item, …). Use `compoundVariants` for size × state matrices.
