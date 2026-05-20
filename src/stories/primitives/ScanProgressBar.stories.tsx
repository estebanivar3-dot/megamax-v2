import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { ScanProgressBar } from "@/components/megamax/scan-progress-bar"
import { Button } from "@/components/megamax/button"

const meta: Meta<typeof ScanProgressBar> = {
  title: "Primitives/ScanProgressBar",
  component: ScanProgressBar,
  parameters: { layout: "centered" },
  argTypes: {
    value:    { control: { type: "range", min: 0, max: 100, step: 1 } },
    loop:     { control: "boolean" },
    duration: { control: { type: "number", min: 800, max: 8000, step: 100 } },
  },
}

export default meta
type Story = StoryObj<typeof ScanProgressBar>

export const Static: Story = {
  args: { value: 58, loop: false },
  render: (args) => (
    <div style={{ width: 360 }}>
      <ScanProgressBar {...args} />
    </div>
  ),
}

export const Loop: Story = {
  args: { loop: true, duration: 3600 },
  render: (args) => (
    <div style={{ width: 360 }}>
      <ScanProgressBar {...args} />
    </div>
  ),
}

/**
 * Interactive — flip between static and loop mode, watch the dither edge
 * detach from the fill at 100% (overflow-clipped). Static mode lets you
 * scrub the value via a slider.
 */
export const Interactive: Story = {
  render: function Interactive() {
    const [mode, setMode] = useState<"static" | "loop">("loop")
    const [value, setValue] = useState(58)
    const [dither, setDither] = useState(true)
    return (
      <div style={{ width: 360 }} className="flex flex-col gap-(--spacing-mm-12) p-(--spacing-mm-12)">
        <ScanProgressBar
          {...(mode === "loop" ? { loop: true, duration: 3600 } : { value })}
          ditherAnimated={dither}
        />
        <div className="flex items-center gap-(--spacing-mm-4)">
          <Button color="dark" onClick={() => setMode(mode === "loop" ? "static" : "loop")}>
            MODE: {mode.toUpperCase()}
          </Button>
          <Button color="dark" onClick={() => setDither((d) => !d)}>
            DITHER: {dither ? "ON" : "OFF"}
          </Button>
        </div>
        {mode === "static" && (
          <label className="flex items-center gap-(--spacing-mm-8) font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted)]">
            <input
              type="range" min={0} max={100} value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-[var(--color-mm-fg)] w-[40px] text-right">{value}%</span>
          </label>
        )}
      </div>
    )
  },
}

export const NoDither: Story = {
  args: { value: 58, ditherAnimated: false },
  render: (args) => (
    <div style={{ width: 360 }}>
      <ScanProgressBar {...args} />
    </div>
  ),
}
