import type { Meta, StoryObj } from "@storybook/react-vite"
import { Kbd } from "@/components/megamax/kbd"

const meta: Meta<typeof Kbd> = {
  title: "Primitives/Kbd",
  component: Kbd,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Kbd>

export const Default: Story = { args: { children: "CTRL+." } }

export const Set: Story = {
  name: "Set · common shortcuts",
  render: () => (
    <div className="flex items-center gap-(--spacing-mm-12)">
      <Kbd>CTRL+.</Kbd>
      <Kbd>CTRL+J</Kbd>
      <Kbd>SHIFT+TAB</Kbd>
      <Kbd>⌘+K</Kbd>
      <Kbd>ESC</Kbd>
    </div>
  ),
}
