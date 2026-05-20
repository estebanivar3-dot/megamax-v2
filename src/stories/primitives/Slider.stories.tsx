import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Slider } from "@/components/megamax/slider"

const meta: Meta<typeof Slider> = {
  title: "Primitives/Slider",
  component: Slider,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[280px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  args: { defaultValue: 40, min: 0, max: 100 },
}

export const Tight: Story = {
  name: "Float range",
  args: { defaultValue: 0.9, min: 0, max: 1, step: 0.01 },
}

export const Disabled: Story = {
  args: { defaultValue: 50, disabled: true },
}

export const Interactive: Story = {
  render: function Interactive() {
    const [v, setV] = useState(28)
    return (
      <div className="flex flex-col gap-(--spacing-mm-8) font-mono text-mm-tiny tracking-mm-row uppercase text-[var(--color-mm-muted)]">
        <span>opacity <span className="text-[var(--color-mm-fg)] tabular-nums">{v}%</span></span>
        <Slider value={v} onValueChange={setV} />
      </div>
    )
  },
}
