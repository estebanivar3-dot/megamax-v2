import type { Meta, StoryObj } from "@storybook/react-vite"
import { Input } from "@/components/ui/input"

// TextField was renamed to Input — these stories alias the old URL so
// existing bookmarks keep working. New work should use `Primitives → Input`.

const meta: Meta<typeof Input> = {
  title: "Primitives/TextField",
  component: Input,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Input placeholder="filter by slug or tag..." />
    </div>
  ),
}

export const Filled: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Input defaultValue="kb/raw/tweet/rookie-edge.md" />
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Input disabled defaultValue="locked / read-only" />
    </div>
  ),
}

export const Invalid: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <Input aria-invalid defaultValue="bad/slug WITH spaces" />
    </div>
  ),
}
