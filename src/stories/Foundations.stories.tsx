import type { Meta, StoryObj } from "@storybook/react-vite"
import { TextLabel } from "@/components/megamax/text-label"

const meta: Meta = {
  title: "Foundations/Tokens",
  parameters: { layout: "padded", magnify: false },
}

export default meta
type Story = StoryObj

const colors: Array<[string, string]> = [
  // Neutrals
  ["--color-mm-bg", "Frame body"],
  ["--color-mm-fg", "Primary text"],
  ["--color-mm-muted", "Secondary text"],
  ["--color-mm-muted-soft", "Tiny labels (60% muted)"],
  ["--color-mm-fg-soft", "Dim value (60% fg)"],
  ["--color-mm-fg-dim", "Dimmer value (50% fg)"],
  ["--color-mm-fg-bright", "Active nav/pill (40% white)"],
  ["--color-mm-fg-bright-hover", "Active hover (50% white)"],
  ["--color-mm-border", "Default border"],
  ["--color-mm-border-soft", "Subtle border (5% white)"],
  ["--color-mm-surface", "Tab/Label surface (5% white)"],
  ["--color-mm-surface-hover", "Hover surface (8% white)"],
  ["--color-mm-tab-list-bg", "TabList / input cell"],
  ["--color-mm-handle", "Switch handle (pure white)"],
  ["--color-mm-handle-soft", "Switch off handle"],
  // Brand
  ["--color-mm-brand", "Brand (chrome)"],
  ["--color-mm-brand-hover", "Brand hover"],
  ["--color-mm-brand-soft", "Brand 80%"],
  ["--color-mm-brand-soft-hover", "Brand soft hover"],
  ["--color-mm-on-brand", "Text on brand"],
  ["--color-mm-on-brand-soft", "Text on brand 60%"],
  // Accents (each has matching -fill 10% and -border 30%)
  ["--color-mm-cyan", "Accent cyan"],
  ["--color-mm-cyan-hover", "Cyan hover"],
  ["--color-mm-green", "Accent green"],
  ["--color-mm-pink", "Accent pink"],
  ["--color-mm-amber", "Accent amber"],
  ["--color-mm-purple", "Accent purple"],
  ["--color-mm-progress-tail", "Progress tail"],
]

const accentTriplets: Array<[string, string]> = [
  ["cyan",   "scan/progress bars · pinned section"],
  ["green",  "success states · approve actions"],
  ["pink",   "alerts · attention tags"],
  ["amber",  "warnings · attention numerics"],
  ["purple", "info · debug-flag tags"],
]

const fontSizes: Array<[string, string, string]> = [
  ["--text-mm-pico", "6px",  "badge body · pre-tag glyph"],
  ["--text-mm-nano", "8px",  "tags · NAME · current focus · keyboard hints"],
  ["--text-mm-tiny", "10px", "row label · status pill · tab text · body copy"],
  ["--text-mm-row",  "11px", "IndexRow id prefix"],
  ["--text-mm-sm",   "12px", "HudFrameTitle · current focus value"],
  ["--text-mm-md",   "18px", "stat numbers (39%, 118)"],
  ["--text-mm-lg",   "24px", "hero numerics · hero title"],
]

const tracking: Array<[string, string, string]> = [
  ["tracking-mm-pill",    "0.33px", "status pill inner text"],
  ["tracking-mm-button",  "0.36px", "button label"],
  ["tracking-mm-kbd",     "0.5px",  "kbd SPACE label"],
  ["tracking-mm-tab",     "0.7px",  "tab text"],
  ["tracking-mm-row",     "0.88px", "IndexRow uppercase label"],
  ["tracking-mm-label",   "1.08px", "muted uppercase labels"],
  ["tracking-mm-title",   "1.2px",  "HudFrameTitle · big stats · pill brackets"],
  ["tracking-mm-section", "1.32px", "section header (AT A GLANCE)"],
]

const leading: Array<[string, string, string]> = [
  ["--leading-mm-tight",  "1.1", "hero numerics · multi-line titles"],
  ["--leading-mm-snug",   "1.3", "inline-edit input"],
  ["--leading-mm-normal", "1.5", "body copy · default for inputs"],
  ["--leading-mm-loose",  "2",   "tab text"],
]

const spacing: Array<[string, string]> = [
  ["--spacing-mm-2",  "2px"],
  ["--spacing-mm-4",  "4px"],
  ["--spacing-mm-6",  "6px"],
  ["--spacing-mm-8",  "8px"],
  ["--spacing-mm-12", "12px"],
  ["--spacing-mm-16", "16px"],
]

const iconSizes: Array<[string, string, string]> = [
  ["--size-mm-icon-xs", "8px",  "NavItem · NavSection icons"],
  ["--size-mm-icon-sm", "12px", "IconButton xs · DropdownPill md"],
  ["--size-mm-icon-md", "16px", "IconButton sm/md · DropdownPill lg"],
  ["--size-mm-icon-lg", "20px", "Tab icon variant"],
  ["--size-mm-icon-xl", "24px", "IconButton lg"],
]

const buttonSizes: Array<[string, string, string]> = [
  ["--size-mm-button",    "28px", "text Button row height"],
  ["--size-mm-button-xs", "24px", "IconButton xs · tight toolbars"],
  ["--size-mm-button-sm", "32px", "IconButton sm"],
  ["--size-mm-button-md", "40px", "IconButton md · Tab icon variant"],
  ["--size-mm-button-lg", "48px", "IconButton lg"],
]

const miscSizes: Array<[string, string, string]> = [
  ["--size-mm-dot",      "6px",  "tag badge dot"],
  ["--size-mm-dot-sm",   "4px",  "Button subType='dot' marker"],
  ["--size-mm-bracket",  "12px", "tag bracket [ ]"],
  ["--size-mm-bar",      "12px", "progress / scan / segmented bar height"],
  ["--size-mm-badge",    "11px", "count badge in NavItem"],
]

const shadows: Array<[string, string]> = [
  ["--shadow-mm-label",         "Tab selected · IconButton ghost cluster · DropdownPill negative"],
  ["--shadow-mm-label-strong",  "IconButton toolbar cluster (heavier)"],
  ["--shadow-mm-handle-on-sm",  "Toggle sm handle (on state)"],
  ["--shadow-mm-handle-on-md",  "Toggle md handle (on state)"],
  ["--shadow-mm-handle-off-sm", "Toggle sm handle (off state)"],
  ["--shadow-mm-handle-off-md", "Toggle md handle (off state)"],
  ["--shadow-mm-track-inset",   "Toggle off-state track (inset)"],
]

const fonts: Array<[string, string]> = [
  ["--font-sans", "Geist Variable · UI text where mono isn't appropriate"],
  ["--font-mono", "Geist Mono Variable · DEFAULT for all v2 chrome"],
]

export const All: Story = {
  render: () => (
    <div className="bg-[var(--color-mm-bg)] text-[var(--color-mm-fg)] min-h-screen p-8 flex flex-col gap-10 font-mono">
      <section className="flex flex-col gap-3">
        <TextLabel>colors / surfaces</TextLabel>
        <div className="grid grid-cols-4 gap-3">
          {colors.map(([token, label]) => (
            <div key={token} className="flex items-center gap-3 border border-[var(--color-mm-border)] p-3">
              <span className="size-10 border border-[var(--color-mm-border)] shrink-0" style={{ background: `var(${token})` }} />
              <div className="flex flex-col gap-1 text-mm-nano uppercase tracking-mm-label min-w-0">
                <span className="text-[var(--color-mm-fg)] truncate">{token}</span>
                <span className="text-[var(--color-mm-muted)] truncate">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <TextLabel>accent fill + border (per color)</TextLabel>
        <div className="grid grid-cols-5 gap-3">
          {accentTriplets.map(([name, hint]) => (
            <div key={name} className="flex flex-col gap-2 border border-[var(--color-mm-border)] p-3">
              <div
                className="h-12 border"
                style={{ background: `var(--color-mm-${name}-fill)`, borderColor: `var(--color-mm-${name}-border)` }}
              />
              <div className="flex flex-col gap-1 text-mm-nano uppercase tracking-mm-label">
                <span className="text-[var(--color-mm-fg)]">{`--color-mm-${name}-{fill,border}`}</span>
                <span className="text-[var(--color-mm-muted)]">{hint}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <TextLabel>fonts</TextLabel>
        <div className="flex flex-col gap-2">
          {fonts.map(([token, hint]) => (
            <div key={token} className="flex items-baseline gap-6 border-b border-[var(--color-mm-border)] py-3">
              <span style={{ fontFamily: `var(${token})` }} className="text-mm-md text-[var(--color-mm-fg)]">The brown fox 0123</span>
              <span className="text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-muted)]">{token}</span>
              <span className="text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-muted-soft)]">{hint}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <TextLabel>typography scale</TextLabel>
        <div className="flex flex-col gap-2">
          {fontSizes.map(([token, px, hint]) => (
            <div key={token} className="flex items-baseline gap-6 border-b border-[var(--color-mm-border)] py-3">
              <span className="text-[var(--color-mm-fg)] uppercase tracking-mm-title font-bold" style={{ fontSize: `var(${token})` }}>Aa 247</span>
              <span className="text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-muted)]">{token}</span>
              <span className="text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-fg-dim)]">{px}</span>
              <span className="text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-muted-soft)]">{hint}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <TextLabel>tracking scale</TextLabel>
        <div className="flex flex-col gap-2">
          {tracking.map(([token, px, hint]) => (
            <div key={token} className="flex items-center gap-6 border-b border-[var(--color-mm-border)] py-3">
              <span className={`${token} text-mm-tiny uppercase text-[var(--color-mm-fg)]`}>RECENT BATCH EVENTS</span>
              <span className="text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-muted)]">{token}</span>
              <span className="text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-fg-dim)]">{px}</span>
              <span className="text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-muted-soft)]">{hint}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <TextLabel>line-height scale</TextLabel>
        <div className="flex flex-col gap-2">
          {leading.map(([token, value, hint]) => (
            <div key={token} className="flex items-start gap-6 border-b border-[var(--color-mm-border)] py-3">
              <p className="text-mm-tiny text-[var(--color-mm-fg)] w-[160px]" style={{ lineHeight: `var(${token})` }}>
                Line one of text.<br />Line two for height.
              </p>
              <span className="text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-muted)]">{token}</span>
              <span className="text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-fg-dim)]">{value}</span>
              <span className="text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-muted-soft)]">{hint}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <TextLabel>spacing scale</TextLabel>
        <div className="flex items-end gap-6">
          {spacing.map(([token, px]) => (
            <div key={token} className="flex flex-col items-start gap-2">
              <div className="bg-[var(--color-mm-cyan)]" style={{ width: `var(${token})`, height: `var(${token})` }} />
              <span className="text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-muted)]">{token}</span>
              <span className="text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-fg-dim)]">{px}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <TextLabel>icon sizes</TextLabel>
        <div className="flex items-end gap-6">
          {iconSizes.map(([token, px, hint]) => (
            <div key={token} className="flex flex-col items-start gap-2">
              <div className="bg-[var(--color-mm-muted)]" style={{ width: `var(${token})`, height: `var(${token})` }} />
              <span className="text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-muted)]">{token}</span>
              <span className="text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-fg-dim)]">{px}</span>
              <span className="text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-muted-soft)] max-w-[140px]">{hint}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <TextLabel>button sizes</TextLabel>
        <div className="flex items-end gap-6">
          {buttonSizes.map(([token, px, hint]) => (
            <div key={token} className="flex flex-col items-start gap-2">
              <div className="bg-[var(--color-mm-brand)] border border-[var(--color-mm-border)]" style={{ width: `var(${token})`, height: `var(${token})` }} />
              <span className="text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-muted)]">{token}</span>
              <span className="text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-fg-dim)]">{px}</span>
              <span className="text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-muted-soft)] max-w-[140px]">{hint}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <TextLabel>misc sizes (dots · brackets · bars · badges)</TextLabel>
        <div className="flex items-end gap-6">
          {miscSizes.map(([token, px, hint]) => (
            <div key={token} className="flex flex-col items-start gap-2">
              <div className="bg-[var(--color-mm-fg)]" style={{ width: `var(${token})`, height: `var(${token})` }} />
              <span className="text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-muted)]">{token}</span>
              <span className="text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-fg-dim)]">{px}</span>
              <span className="text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-muted-soft)] max-w-[140px]">{hint}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <TextLabel>shadows</TextLabel>
        <div className="grid grid-cols-3 gap-6">
          {shadows.map(([token, hint]) => (
            <div key={token} className="flex flex-col gap-3 p-4">
              <div
                className="h-16 bg-[var(--color-mm-surface)] border border-[var(--color-mm-border)]"
                style={{ boxShadow: `var(${token})` }}
              />
              <div className="flex flex-col gap-1 text-mm-nano uppercase tracking-mm-label">
                <span className="text-[var(--color-mm-fg)]">{token}</span>
                <span className="text-[var(--color-mm-muted-soft)]">{hint}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
}
