import type { Meta, StoryObj } from "@storybook/react-vite"
import { useEffect, useState } from "react"
import { Copy, Clock } from "@nsmr/pixelart-react"
import { SegmentedProgressBar } from "@/components/megamax/segmented-progress-bar"
import { Button } from "@/components/megamax/button"

const meta: Meta<typeof SegmentedProgressBar> = {
  title: "Primitives/SegmentedProgressBar",
  component: SegmentedProgressBar,
  parameters: { layout: "centered" },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    cells: { control: { type: "number", min: 4, max: 72, step: 1 } },
    color: { control: "select", options: ["cyan", "green", "amber", "pink"] },
  },
}

export default meta
type Story = StoryObj<typeof SegmentedProgressBar>

export const Default: Story = {
  args: { value: 70, cells: 27, color: "cyan" },
}

/**
 * The canonical Processes-row composition (Figma 216:911): a header row
 * (copy icon + name + clock icon) above a progress row (segmented bar +
 * percentage). This is the primary real-world use case — most consumers
 * pair the bar with a label and a percentage rather than rendering it bare.
 */
function ProcessRow({ name, value }: { name: string; value: number }) {
  return (
    <div className="mm-pixel-icon flex flex-col gap-(--spacing-mm-6) w-[560px]">
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

export const ProcessRowStory: Story = {
  name: "Process row",
  render: () => <ProcessRow name="game.of.thrones.s02e02" value={70} />,
}

export const ProcessStack: Story = {
  name: "Process stack",
  render: () => (
    <div className="flex flex-col gap-(--spacing-mm-16)">
      <ProcessRow name="game.of.thrones.s02e02" value={70} />
      <ProcessRow name="Screenshot from 2024-05-17 20-09-19.png" value={50} />
    </div>
  ),
}

/**
 * Interactive — value animates 0→100, snapping to whole-cell boundaries.
 * Color toggles cycle through the 4 accent tints.
 */
export const Interactive: Story = {
  render: function Interactive() {
    const colors = ["cyan", "green", "amber", "pink"] as const
    const [value, setValue] = useState(0)
    const [colorIdx, setColorIdx] = useState(0)
    const [running, setRunning] = useState(true)
    useEffect(() => {
      if (!running) return
      const id = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 3)), 120)
      return () => clearInterval(id)
    }, [running])
    return (
      <div className="flex flex-col gap-(--spacing-mm-12) p-(--spacing-mm-12)">
        <SegmentedProgressBar value={value} color={colors[colorIdx]} />
        <div className="flex items-center justify-between font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted)]">
          <div className="flex gap-(--spacing-mm-4)">
            <Button color="dark" onClick={() => setRunning((r) => !r)}>
              {running ? "PAUSE" : "RESUME"}
            </Button>
            <Button color="dark" onClick={() => setColorIdx((i) => (i + 1) % colors.length)}>
              COLOR: {colors[colorIdx]}
            </Button>
          </div>
          <span>{value}%</span>
        </div>
      </div>
    )
  },
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-mm-12) p-(--spacing-mm-12) items-start">
      <SegmentedProgressBar value={78} color="cyan" />
      <SegmentedProgressBar value={45} color="green" />
      <SegmentedProgressBar value={62} color="amber" />
      <SegmentedProgressBar value={20} color="pink" />
    </div>
  ),
}

/**
 * Densities — same value at different cell counts shows how cell count
 * affects perceived granularity. Default is 27 (matches Figma 216:911).
 */
export const Densities: Story = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-mm-12) p-(--spacing-mm-12) items-start">
      <SegmentedProgressBar value={50} cells={12} />
      <SegmentedProgressBar value={50} cells={20} />
      <SegmentedProgressBar value={50} cells={27} />
      <SegmentedProgressBar value={50} cells={40} />
    </div>
  ),
}
