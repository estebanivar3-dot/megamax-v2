import type { Meta, StoryObj } from "@storybook/react-vite"
import { NumericValue } from "@/components/megamax/numeric-value"

const meta: Meta<typeof NumericValue> = {
  title: "Primitives/NumericValue",
  component: NumericValue,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof NumericValue>

export const Default: Story = { args: { defaultValue: "1.00" } }
export const Plain: Story = { args: { defaultValue: "4", tick: false } }
export const Long: Story = { args: { defaultValue: "1024.50" } }
export const ReadOnly: Story = { args: { value: "0.90", readOnly: true } }

export const Set: Story = {
  name: "Set · tick vs plain",
  render: () => (
    <div className="flex items-center gap-(--spacing-mm-12)">
      <NumericValue defaultValue="0.90" />
      <NumericValue defaultValue="121" tick={false} />
      <NumericValue defaultValue="28%" />
      <NumericValue defaultValue="4" tick={false} />
    </div>
  ),
}
