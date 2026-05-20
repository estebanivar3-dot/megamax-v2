import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { SliderRow } from "@/components/megamax/slider-row"

const meta: Meta<typeof SliderRow> = {
  title: "Primitives/SliderRow",
  component: SliderRow,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SliderRow>

export const Inline: Story = {
  args: { label: "Levels", layout: "inline", defaultValue: 4, min: 0, max: 10 },
}

export const Stacked: Story = {
  args: { label: "Saturation", layout: "stacked", defaultValue: 0.9, min: 0, max: 1, step: 0.01, format: (n) => n.toFixed(2) },
}

export const InspectorStack: Story = {
  name: "Inspector stack",
  render: function InspectorStack() {
    const [opacity, setOpacity] = useState(28)
    const [hue, setHue] = useState(121)
    const [sat, setSat] = useState(0.9)
    return (
      <div className="flex flex-col gap-(--spacing-mm-12)">
        <SliderRow label="Opacity" layout="stacked" value={opacity} onValueChange={setOpacity} format={(n) => `${n}%`} />
        <SliderRow label="Hue" layout="stacked" value={hue} onValueChange={setHue} max={360} />
        <SliderRow label="Saturation" layout="stacked" value={sat} onValueChange={setSat} min={0} max={1} step={0.01} format={(n) => n.toFixed(2)} />
      </div>
    )
  },
}
