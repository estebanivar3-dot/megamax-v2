import type { Meta, StoryObj } from "@storybook/react-vite"
import { ShortcutHints } from "@/components/megamax/shortcut-hints"

const meta: Meta<typeof ShortcutHints> = {
  title: "Primitives/ShortcutHints",
  component: ShortcutHints,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof ShortcutHints>

export const Default: Story = {
  args: {
    hints: [
      { keys: "CTRL+.", label: "Shortcuts" },
      { keys: "CTRL+J", label: "Cancel" },
      { keys: "SHIFT+TAB", label: "Mode" },
    ],
  },
}

export const Pair: Story = {
  args: {
    hints: [
      { keys: "⌘+K", label: "Search" },
      { keys: "ESC", label: "Close" },
    ],
  },
}
