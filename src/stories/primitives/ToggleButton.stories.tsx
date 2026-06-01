import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { ToggleButton } from "@/components/megamax/toggle-button"
import { NumberChip } from "@/components/megamax/number-chip"

const meta: Meta<typeof ToggleButton> = {
  title: "Primitives/ToggleButton",
  component: ToggleButton,
  parameters: { layout: "centered" },
  argTypes: {
    active: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof ToggleButton>

export const Default: Story = {
  args: { children: "LEVELS" },
}

export const Active: Story = {
  args: { active: true, children: "LEVELS" },
}

/**
 * Group — the canonical Tasks / Scalers / Anthrax row. One active at a time;
 * the wrapper owns the selection state.
 */
export const Group: Story = {
  render: function Group() {
    const options = ["TASKS", "SCALERS", "ANTHRAX"] as const
    const [selected, setSelected] = useState<(typeof options)[number]>("SCALERS")
    return (
      <div className="inline-flex">
        {options.map((label) => (
          <ToggleButton
            key={label}
            active={selected === label}
            onClick={() => setSelected(label)}
          >
            {label}
          </ToggleButton>
        ))}
      </div>
    )
  },
}

/**
 * Binary — ON / OFF flip. Same primitive, two-option group.
 */
export const Binary: Story = {
  render: function Binary() {
    const [on, setOn] = useState(true)
    return (
      <div className="inline-flex">
        <ToggleButton active={on} onClick={() => setOn(true)}>ORIGINAL</ToggleButton>
        <ToggleButton active={!on} onClick={() => setOn(false)}>DUOTONE</ToggleButton>
      </div>
    )
  },
}

/**
 * With chip — Figma's `Show number` boolean satisfied by passing a
 * `<NumberChip>` into the `trailing` slot. Pattern matches MenuListItem's
 * `trailing` slot so a single chip primitive serves both consumers.
 */
export const WithNumberChip: Story = {
  render: function WithNumberChip() {
    const [active, setActive] = useState(true)
    return (
      <ToggleButton
        active={active}
        trailing={<NumberChip>4</NumberChip>}
        onClick={() => setActive((v) => !v)}
      >
        LEVELS
      </ToggleButton>
    )
  },
}

/**
 * Group with chips — the full pattern: segmented selection where each option
 * carries a count. Demonstrates that the chip lives independent of the
 * active state.
 */
export const GroupWithChips: Story = {
  render: function GroupWithChips() {
    const rows = [
      { label: "TASKS",   count: 12 },
      { label: "SCALERS", count: 3  },
      { label: "ANTHRAX", count: 24 },
    ]
    const [selected, setSelected] = useState("SCALERS")
    return (
      <div className="inline-flex">
        {rows.map(({ label, count }) => (
          <ToggleButton
            key={label}
            active={selected === label}
            trailing={<NumberChip>{count}</NumberChip>}
            onClick={() => setSelected(label)}
          >
            {label}
          </ToggleButton>
        ))}
      </div>
    )
  },
}
