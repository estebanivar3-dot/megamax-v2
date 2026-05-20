import type { Meta, StoryObj } from "@storybook/react-vite"
import { useEffect, useState } from "react"
import { ProgressBar } from "@/components/megamax/progress-bar"
import { Button } from "@/components/megamax/button"

const meta: Meta<typeof ProgressBar> = {
  title: "Primitives/ProgressBar",
  component: ProgressBar,
  parameters: { layout: "centered" },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    color: { control: "select", options: ["cyan", "green", "amber", "pink"] },
  },
}

export default meta
type Story = StoryObj<typeof ProgressBar>

export const Default: Story = {
  args: { value: 58, color: "cyan" },
  render: (args) => (
    <div style={{ width: 360 }}>
      <ProgressBar {...args} />
    </div>
  ),
}

/**
 * Interactive — value advances every 100ms; the 3×3 dither pattern slides
 * along the fill edge. At 0% no fill renders; at 100% the dither disappears
 * and the bar is fully solid.
 */
export const Interactive: Story = {
  render: function Interactive() {
    const colors = ["cyan", "green", "amber", "pink"] as const
    const [value, setValue] = useState(0)
    const [colorIdx, setColorIdx] = useState(0)
    const [running, setRunning] = useState(true)
    useEffect(() => {
      if (!running) return
      const id = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 2)), 100)
      return () => clearInterval(id)
    }, [running])
    return (
      <div style={{ width: 360 }} className="flex flex-col gap-(--spacing-mm-12) p-(--spacing-mm-12)">
        <ProgressBar value={value} color={colors[colorIdx]} />
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
    <div style={{ width: 360 }} className="flex flex-col gap-(--spacing-mm-12) p-(--spacing-mm-12)">
      <ProgressBar value={78} color="cyan" />
      <ProgressBar value={45} color="green" />
      <ProgressBar value={62} color="amber" />
      <ProgressBar value={20} color="pink" />
    </div>
  ),
}

/**
 * Edge cases — 0, mid, 100. Confirms dither only shows for partial values.
 */
export const EdgeCases: Story = {
  render: () => (
    <div style={{ width: 360 }} className="flex flex-col gap-(--spacing-mm-12) p-(--spacing-mm-12)">
      <ProgressBar value={0} />
      <ProgressBar value={50} />
      <ProgressBar value={100} />
    </div>
  ),
}
