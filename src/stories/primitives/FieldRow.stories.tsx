import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { FieldRow } from "@/components/megamax/field-row"
import { HudInput } from "@/components/megamax/hud-input"
import { NumericValue } from "@/components/megamax/numeric-value"
import { Slider } from "@/components/megamax/slider"

const meta: Meta<typeof FieldRow> = {
  title: "Primitives/FieldRow",
  component: FieldRow,
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
type Story = StoryObj<typeof FieldRow>

export const WithInput: Story = {
  args: {
    label: "Text label",
    children: <HudInput bordered={false} defaultValue="The tired developer goes to" />,
  },
}

export const WithNumeric: Story = {
  args: {
    label: "Container",
    children: <NumericValue defaultValue="1" />,
  },
}

export const WithSliderAndValue: Story = {
  render: () => {
    const [value, setValue] = React.useState(4)
    return (
      <FieldRow label="Levels">
        <div className="flex-1">
          <Slider value={value} onValueChange={setValue} max={10} />
        </div>
        <NumericValue
          value={String(value)}
          onChange={(e) => {
            const n = Number(e.target.value)
            if (!Number.isNaN(n)) setValue(Math.max(0, Math.min(10, n)))
          }}
        />
      </FieldRow>
    )
  },
}
