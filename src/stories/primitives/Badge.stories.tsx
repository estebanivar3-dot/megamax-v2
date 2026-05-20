import type { Meta, StoryObj } from "@storybook/react-vite"
import { Badge } from "@/components/megamax/badge"

const meta: Meta<typeof Badge> = {
  title: "Primitives/Badge",
  component: Badge,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = { args: { children: "1" } }

/**
 * Hug-mode: single digit is a `--size-mm-badge` square; multi-digit/letter
 * content grows the width while keeping the same height. Regression catch —
 * if anyone ever swaps `min-w-(--size-mm-badge)` for `size-(--size-mm-badge)`
 * the right-side variants will clip.
 */
export const Widths: Story = {
  render: () => (
    <div className="flex items-center gap-(--spacing-mm-8)">
      <Badge>1</Badge>
      <Badge>4</Badge>
      <Badge>12</Badge>
      <Badge>99+</Badge>
      <Badge>NEW</Badge>
      <Badge>BETA</Badge>
    </div>
  ),
}

/**
 * Active-state inversion: Badge auto-inverts when nested inside any `group`
 * element with `data-active="true"` (NavItem provides both). This story
 * fakes the wrapper to demo the inversion without bringing in Sidebar.
 */
export const Active: Story = {
  render: () => (
    <div className="group flex items-center gap-(--spacing-mm-8) bg-[var(--color-mm-fg-bright)] px-(--spacing-mm-8) py-(--spacing-mm-4)" data-active="true">
      <span className="font-mono text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-on-brand)]">Postgres</span>
      <Badge>1</Badge>
    </div>
  ),
}
