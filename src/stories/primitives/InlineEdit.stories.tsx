import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import {
  InlineEditField,
  InlineEditInput,
  InlineEditHero,
} from "@/components/megamax/inline-edit"

const meta: Meta = {
  title: "Primitives/InlineEdit",
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj

export const Input: Story = {
  render: () => (
    <div style={{ width: 340 }}>
      <InlineEditField label="current focus">
        <InlineEditInput size="sm" defaultValue="The Privatized Past" />
      </InlineEditField>
    </div>
  ),
}

export const Hero: Story = {
  render: () => (
    <div style={{ width: 340 }}>
      <InlineEditField label="NAME">
        <InlineEditHero defaultValue="LMK / Operator Console" />
      </InlineEditField>
    </div>
  ),
}

/**
 * Interactive — type into either field and watch the live value below.
 * Try mixing letters, numbers, slashes and punctuation to see the
 * per-character two-tone paint (word chars fg, everything else muted).
 */
export const Interactive: Story = {
  render: function Interactive() {
    const [name, setName] = useState("LMK / Operator Console")
    const [focus, setFocus] = useState("the privatized past")
    return (
      <div style={{ width: 360 }} className="flex flex-col gap-(--spacing-mm-16) p-(--spacing-mm-12)">
        <InlineEditField label="NAME">
          <InlineEditHero defaultValue={name} onChange={setName} />
        </InlineEditField>
        <InlineEditField label="current focus">
          <InlineEditInput size="sm" defaultValue={focus} onChange={setFocus} />
        </InlineEditField>
        <div className="font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted-soft)] flex flex-col gap-(--spacing-mm-4)">
          <div className="flex justify-between"><span>name length</span><span className="text-[var(--color-mm-fg)]">{name.length}</span></div>
          <div className="flex justify-between"><span>focus length</span><span className="text-[var(--color-mm-fg)]">{focus.length}</span></div>
        </div>
      </div>
    )
  },
}

/**
 * Empty — fields with no `defaultValue`, just a `placeholder`. Placeholder
 * disappears the moment you start typing (CSS `:empty:before` driven).
 * Label flips to brand-cyan when its field is focused.
 */
export const Empty: Story = {
  render: () => (
    <div style={{ width: 460 }} className="flex flex-col gap-(--spacing-mm-16) p-(--spacing-mm-12)">
      <InlineEditField label="TITLE">
        <InlineEditInput size="md" placeholder="Click to edit..." />
      </InlineEditField>
      <InlineEditField label="SUBTITLE">
        <InlineEditInput size="sm" placeholder="Click to edit..." />
      </InlineEditField>
      <InlineEditField label="NAME">
        <InlineEditHero placeholder="Click to edit..." />
      </InlineEditField>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ width: 340 }} className="flex flex-col gap-(--spacing-mm-12) p-(--spacing-mm-12)">
      <InlineEditField label="sm">
        <InlineEditInput size="sm" defaultValue="small / 12px / try typing %&/" />
      </InlineEditField>
      <InlineEditField label="md">
        <InlineEditInput size="md" defaultValue="medium / 18px / mixed chars" />
      </InlineEditField>
      <InlineEditField label="hero">
        <InlineEditHero defaultValue="HERO / 24px / two-tone" />
      </InlineEditField>
    </div>
  ),
}
