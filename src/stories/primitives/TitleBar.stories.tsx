import type { Meta, StoryObj } from "@storybook/react-vite"
import { TitleBar } from "@/components/megamax/title-bar"

const meta: Meta<typeof TitleBar> = {
  title: "Primitives/TitleBar",
  component: TitleBar,
  parameters: { layout: "centered" },
  decorators: [
    // Wrap in a panel WITH a body region so the TitleBar's intentional
    // `border-b` reads as the header divider — not a doubled line stacking
    // against the wrapper's own bottom border (which happens when TitleBar
    // is the box's only child and the box collapses to its height).
    (Story) => (
      <div className="w-[360px] border border-[var(--color-mm-border)] bg-[var(--color-mm-bg)]">
        <Story />
        <div className="p-(--spacing-mm-12) font-mono text-mm-nano leading-(--leading-mm-normal) uppercase tracking-mm-label text-[var(--color-mm-muted-soft)]">
          PANEL BODY · the title bar's bottom border divides header from content.
        </div>
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TitleBar>

export const Default: Story = { args: { title: "WYRM", status: "06:04:11 — LAST.FM" } }
export const Breadcrumb: Story = { args: { title: "/USERS/ESTEBAN/CHAT", status: "SUPERFILE" } }
export const TitleOnly: Story = { args: { title: "INSPECTOR" } }
