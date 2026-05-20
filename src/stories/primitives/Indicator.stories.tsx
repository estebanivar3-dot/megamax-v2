import type { Meta, StoryObj } from "@storybook/react-vite"
import { Indicator } from "@/components/megamax/indicator"

const meta: Meta<typeof Indicator> = {
  title: "Primitives/Indicator",
  component: Indicator,
  parameters: { layout: "centered" },
  argTypes: {
    tone: { control: "select", options: ["cyan", "brand", "green", "amber", "pink", "purple", "muted"] },
    live: { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Indicator>

export const Default: Story = { args: { tone: "cyan" } }
export const Live: Story = { args: { tone: "green", live: true } }

export const Palette: Story = {
  render: () => (
    <div className="flex items-center gap-(--spacing-mm-12)">
      {(["cyan", "brand", "green", "amber", "pink", "purple", "muted"] as const).map((t) => (
        <div key={t} className="flex flex-col items-center gap-(--spacing-mm-6) font-mono text-mm-nano tracking-mm-kbd uppercase text-[var(--color-mm-muted)]">
          <Indicator tone={t} />
          {t}
        </div>
      ))}
    </div>
  ),
}

export const LiveSet: Story = {
  name: "Live · pulsing",
  render: () => (
    <div className="flex items-center gap-(--spacing-mm-12)">
      <Indicator tone="green" live />
      <Indicator tone="cyan" live />
      <Indicator tone="amber" live />
      <Indicator tone="pink" live />
    </div>
  ),
}
