import type { Meta, StoryObj } from "@storybook/react-vite"
import { TitleBar } from "@/components/megamax/title-bar"

const meta: Meta<typeof TitleBar> = {
  title: "Primitives/TitleBar",
  component: TitleBar,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[360px] border border-[var(--color-mm-border)] bg-[var(--color-mm-bg)]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof TitleBar>

export const Default: Story = { args: { title: "WYRM", status: "06:04:11 — LAST.FM" } }
export const Breadcrumb: Story = { args: { title: "/USERS/ESTEBAN/CHAT", status: "SUPERFILE" } }
export const TitleOnly: Story = { args: { title: "INSPECTOR" } }
