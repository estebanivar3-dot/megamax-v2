import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { ToggleButton } from "@/components/ui/toggle"

const meta: Meta<typeof ToggleButton> = {
  title: "Primitives/ToggleButton",
  component: ToggleButton,
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["default", "outline"] },
    size:    { control: "select", options: ["sm", "md", "lg", "iconSm", "icon", "iconLg"] },
  },
}

export default meta
type Story = StoryObj<typeof ToggleButton>

export const Default: Story = {
  args: { children: "BOLD" },
}

export const Outline: Story = {
  args: { variant: "outline", children: "ITALIC" },
}

export const Pressed: Story = {
  args: { defaultPressed: true, children: "ON" },
}

export const Disabled: Story = {
  args: { disabled: true, children: "DISABLED" },
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-(--spacing-mm-8) p-(--spacing-mm-12)">
      <ToggleButton size="sm" defaultPressed>SM</ToggleButton>
      <ToggleButton size="md" defaultPressed>MD</ToggleButton>
      <ToggleButton size="lg" defaultPressed>LG</ToggleButton>
    </div>
  ),
}

/**
 * Icon-only — square shape with size variants. Pass any SVG as the child;
 * its size is set by the variant (14/16/18px for sm/md/lg).
 */
export const Icon: Story = {
  render: () => (
    <div className="flex items-center gap-(--spacing-mm-8) p-(--spacing-mm-12)">
      <ToggleButton size="iconSm" aria-label="bold" defaultPressed>
        <BoldGlyph />
      </ToggleButton>
      <ToggleButton size="icon" aria-label="italic">
        <ItalicGlyph />
      </ToggleButton>
      <ToggleButton size="iconLg" variant="outline" aria-label="underline" defaultPressed>
        <UnderlineGlyph />
      </ToggleButton>
    </div>
  ),
}

/**
 * Toolbar — common toolbar pattern with grouped icon toggles. Each tracks
 * independent pressed state; the rightmost is a separator-bordered chip.
 */
export const Toolbar: Story = {
  render: function Toolbar() {
    const [bold, setBold] = useState(true)
    const [italic, setItalic] = useState(false)
    const [under, setUnder] = useState(false)
    return (
      <div className="flex items-center gap-(--spacing-mm-4) p-(--spacing-mm-4) border border-[var(--color-mm-border)]">
        <ToggleButton size="icon" pressed={bold}   onPressedChange={setBold}   aria-label="bold">
          <BoldGlyph />
        </ToggleButton>
        <ToggleButton size="icon" pressed={italic} onPressedChange={setItalic} aria-label="italic">
          <ItalicGlyph />
        </ToggleButton>
        <ToggleButton size="icon" pressed={under}  onPressedChange={setUnder}  aria-label="underline">
          <UnderlineGlyph />
        </ToggleButton>
      </div>
    )
  },
}

/* ── inline 16×16 glyphs (mono, brutalist) ───────────────────────────── */

function BoldGlyph() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <text x="8" y="12" textAnchor="middle" fontFamily="ui-monospace, monospace" fontWeight="900" fontSize="11" fill="currentColor">B</text>
    </svg>
  )
}
function ItalicGlyph() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <text x="8" y="12" textAnchor="middle" fontFamily="ui-monospace, monospace" fontStyle="italic" fontWeight="600" fontSize="11" fill="currentColor">I</text>
    </svg>
  )
}
function UnderlineGlyph() {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <text x="8" y="11" textAnchor="middle" fontFamily="ui-monospace, monospace" fontWeight="600" fontSize="11" fill="currentColor" textDecoration="underline">U</text>
      <path d="M4 14 L12 14" stroke="currentColor" strokeWidth="1.25" strokeLinecap="square" />
    </svg>
  )
}

/**
 * Interactive — a faux text-style toolbar (bold/italic/underline). Each
 * toggle keeps independent state. State persists per button across clicks.
 */
export const Interactive: Story = {
  render: function Interactive() {
    const [bold, setBold] = useState(false)
    const [italic, setItalic] = useState(true)
    const [under, setUnder] = useState(false)
    const value =
      [bold && "B", italic && "I", under && "U"].filter(Boolean).join("") || "—"
    return (
      <div className="flex flex-col items-center gap-(--spacing-mm-12) p-(--spacing-mm-12)">
        <div className="flex gap-(--spacing-mm-4) p-(--spacing-mm-4) border border-[var(--color-mm-border)]">
          <ToggleButton variant="default" pressed={bold}   onPressedChange={setBold}>B</ToggleButton>
          <ToggleButton variant="default" pressed={italic} onPressedChange={setItalic} className="italic">I</ToggleButton>
          <ToggleButton variant="default" pressed={under}  onPressedChange={setUnder} className="underline">U</ToggleButton>
        </div>
        <div className="font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted-soft)]">
          active:&nbsp;<span className="text-[var(--color-mm-fg)]">{value}</span>
        </div>
      </div>
    )
  },
}
