import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { ToggleRow } from "@/components/megamax/toggle-row"

const meta: Meta<typeof ToggleRow> = {
  title: "Primitives/ToggleRow",
  component: ToggleRow,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ToggleRow>

const onOff = [
  { value: "on", label: "On" },
  { value: "off", label: "Off" },
]

export const Binary: Story = {
  args: {
    label: "Bloom",
    options: onOff,
    defaultValue: "off",
  },
}

export const Triple: Story = {
  args: {
    label: "Tabs",
    options: [
      { value: "tasks", label: "Tasks" },
      { value: "scalers", label: "Scalers" },
      { value: "anthrax", label: "Anthrax" },
    ],
    defaultValue: "tasks",
  },
}

export const Stack: Story = {
  name: "Effects stack",
  render: function Stack() {
    const [color, setColor] = useState("original")
    const [muted, setMuted] = useState("on")
    const [bloom, setBloom] = useState("off")
    return (
      <div className="flex flex-col gap-(--spacing-mm-8)">
        <ToggleRow
          label="Color mode"
          options={[{ value: "original", label: "Original" }, { value: "duotone", label: "Duotone" }]}
          value={color}
          onValueChange={setColor}
        />
        <ToggleRow label="Muted" options={onOff} value={muted} onValueChange={setMuted} />
        <ToggleRow label="Bloom" options={onOff} value={bloom} onValueChange={setBloom} />
      </div>
    )
  },
}
