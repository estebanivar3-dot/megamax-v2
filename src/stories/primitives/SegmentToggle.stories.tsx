import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { ToggleButton } from "@/components/megamax/toggle-button"

/**
 * Brutalist `ToggleButton` (183:12314) — bare text segment used inside
 * toggle groups. Distinct from the shadcn `Primitives/ToggleButton` story
 * which wraps Radix Toggle.
 */
const meta: Meta<typeof ToggleButton> = {
  title: "Primitives/Segment (ToggleButton)",
  component: ToggleButton,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof ToggleButton>

export const Active: Story = { args: { active: true, children: "Tasks" } }
export const Inactive: Story = { args: { active: false, children: "Scalers" } }

export const Group: Story = {
  name: "Tab group · single-select",
  render: function Group() {
    const [v, setV] = useState("tasks")
    return (
      <div className="inline-flex items-start">
        {[
          { value: "tasks", label: "Tasks" },
          { value: "scalers", label: "Scalers" },
          { value: "anthrax", label: "Anthrax" },
        ].map((o) => (
          <ToggleButton key={o.value} active={o.value === v} onClick={() => setV(o.value)}>
            {o.label}
          </ToggleButton>
        ))}
      </div>
    )
  },
}

export const Binary: Story = {
  name: "Binary · ON / OFF",
  render: function Binary() {
    const [v, setV] = useState("off")
    return (
      <div className="inline-flex items-start">
        <ToggleButton active={v === "on"} onClick={() => setV("on")}>On</ToggleButton>
        <ToggleButton active={v === "off"} onClick={() => setV("off")}>Off</ToggleButton>
      </div>
    )
  },
}
