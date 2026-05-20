import type { Meta, StoryObj } from "@storybook/react-vite"
import { Copy, Clock } from "@nsmr/pixelart-react"
import { FramedInput } from "@/components/megamax/framed-input"
import { HudInput } from "@/components/megamax/hud-input"
import { SegmentedProgressBar } from "@/components/megamax/segmented-progress-bar"

const meta: Meta<typeof FramedInput> = {
  title: "Primitives/FramedInput",
  component: FramedInput,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[680px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FramedInput>

const Slot = () => (
  <div className="h-[40px] w-full flex items-center justify-center text-mm-nano text-[var(--color-mm-muted-soft)] uppercase tracking-mm-label">
    SLOT
  </div>
)

export const AllCorners: Story = {
  args: {
    topLeft: "Text · Label",
    topRight: "Text · Label",
    bottomLeft: "Text · Label",
    bottomRight: "Text · Label",
    children: <Slot />,
  },
}

export const BorderLabel: Story = {
  args: {
    variant: "border-label",
    topLeft: "Text · Label",
    topRight: "Text · Label",
    bottomLeft: "Text · Label",
    bottomRight: "Text · Label",
    children: <Slot />,
  },
}

/**
 * Real-world use: wrap an HudInput with name + units in the corners. The
 * tags act as metadata about the field without competing with the input's
 * own label/placeholder.
 */
export const WithInput: Story = {
  args: {
    topLeft: "Frequency",
    topRight: "Hz",
    bottomRight: "0 — 440",
    children: <HudInput placeholder="0.00" />,
  },
}

/**
 * Tags are independently optional — pass only the corners you need. Common
 * pattern: name in TL, range hint in BR.
 */
export const Sparse: Story = {
  args: {
    topLeft: "Threshold",
    bottomRight: "0 — 1",
    children: <Slot />,
  },
}

/**
 * Real-world composition (216:911) — FramedInput labeled "Proceses" wraps
 * a stack of process rows. Each row pairs an icon header (copy + name +
 * clock) with a SegmentedProgressBar + percentage. Demonstrates that
 * FramedInput is a generic wrapper that composes cleanly with whatever
 * data-density widgets the consumer brings.
 */
function ProcessRow({ name, value }: { name: string; value: number }) {
  return (
    <div className="mm-pixel-icon flex flex-col gap-(--spacing-mm-6) w-full">
      <div className="flex items-center gap-(--spacing-mm-4) w-full">
        <Copy className="size-(--size-mm-icon-xs) shrink-0 text-[var(--color-mm-muted)]" />
        <span className="flex-1 min-w-0 font-mono text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-muted)] truncate">
          {name}
        </span>
        <Clock className="size-(--size-mm-icon-xs) shrink-0 text-[var(--color-mm-muted)]" />
      </div>
      <div className="flex items-center justify-between gap-(--spacing-mm-8) w-full">
        <SegmentedProgressBar value={value} cells={36} />
        <span className="font-mono font-medium text-mm-nano tracking-mm-label uppercase text-[var(--color-mm-muted)] whitespace-nowrap">
          {value}%
        </span>
      </div>
    </div>
  )
}

export const Processes: Story = {
  args: {
    topLeft: "Proceses",
    children: (
      <div className="flex flex-col gap-(--spacing-mm-16) w-full">
        <ProcessRow name="game.of.thrones.s02e02" value={70} />
        <ProcessRow name="Screenshot from 2024-05-17 20-09-19.png" value={50} />
      </div>
    ),
  },
}
