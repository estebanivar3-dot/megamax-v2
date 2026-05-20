import type { Meta, StoryObj } from "@storybook/react-vite"
import { useEffect, useState } from "react"
import { LineLoader } from "@/components/megamax/line-loader"
import { Button } from "@/components/megamax/button"

const meta: Meta<typeof LineLoader> = {
  title: "Primitives/LineLoader",
  component: LineLoader,
  parameters: { layout: "centered" },
  argTypes: {
    value:  { control: { type: "range", min: 0, max: 100, step: 1 } },
    cells:  { control: { type: "number", min: 4, max: 36, step: 1 } },
    gap:    { control: { type: "number", min: 0, max: 8, step: 1 } },
    height: { control: { type: "number", min: 2, max: 16, step: 1 } },
    color:  { control: "select", options: ["cyan", "green", "amber", "pink"] },
  },
}

export default meta
type Story = StoryObj<typeof LineLoader>

export const Default: Story = {
  args: { value: 36, cells: 14, color: "cyan", gap: 1, height: 4 },
  render: (args) => (
    <div style={{ width: 320 }}>
      <LineLoader {...args} />
    </div>
  ),
}

/**
 * Interactive — running/paused state, value steps every 200ms.
 * Demonstrates the chunky cell-by-cell fill at a controllable cadence.
 */
export const Interactive: Story = {
  render: function Interactive() {
    const [value, setValue] = useState(0)
    const [running, setRunning] = useState(true)
    useEffect(() => {
      if (!running) return
      const id = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 5)), 200)
      return () => clearInterval(id)
    }, [running])
    return (
      <div style={{ width: 320 }} className="flex flex-col gap-(--spacing-mm-12) p-(--spacing-mm-12)">
        <LineLoader value={value} color="cyan" cells={20} gap={1} height={6} />
        <div className="flex items-center justify-between font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted)]">
          <Button color="dark" onClick={() => setRunning((r) => !r)}>
            {running ? "PAUSE" : "RESUME"}
          </Button>
          <span>value: <span className="text-[var(--color-mm-fg)]">{value}%</span></span>
        </div>
      </div>
    )
  },
}

export const Variants: Story = {
  render: () => (
    <div style={{ width: 320 }} className="flex flex-col gap-(--spacing-mm-16) p-(--spacing-mm-12)">
      <LineLoader value={36} color="cyan" />
      <LineLoader value={78} color="green" cells={20} gap={2} height={6} />
      <LineLoader value={12} color="amber" cells={10} gap={3} height={8} />
      <LineLoader value={92} color="pink" cells={24} gap={1} height={3} />
    </div>
  ),
}
