import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Toggle } from "@/components/megamax/toggle"

const meta: Meta<typeof Toggle> = {
  title: "Primitives/Toggle",
  component: Toggle,
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
    on:   { control: "boolean" },
  },
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Md: Story = {
  args: { size: "md", defaultOn: false },
}

export const Sm: Story = {
  args: { size: "sm", defaultOn: false },
}

export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-mm-12) p-(--spacing-mm-12) items-start">
      <div className="flex items-center gap-(--spacing-mm-12)">
        <Toggle size="md" defaultOn />
        <span className="font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted)]">md · on</span>
      </div>
      <div className="flex items-center gap-(--spacing-mm-12)">
        <Toggle size="md" defaultOn={false} />
        <span className="font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted)]">md · off</span>
      </div>
      <div className="flex items-center gap-(--spacing-mm-12)">
        <Toggle size="sm" defaultOn />
        <span className="font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted)]">sm · on</span>
      </div>
      <div className="flex items-center gap-(--spacing-mm-12)">
        <Toggle size="sm" defaultOn={false} />
        <span className="font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted)]">sm · off</span>
      </div>
    </div>
  ),
}

export const Controlled: Story = {
  render: function Controlled() {
    const [on, setOn] = useState(false)
    return (
      <div className="flex flex-col gap-(--spacing-mm-12) items-center">
        <Toggle on={on} onChange={setOn} />
        <span className="font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted)]">
          state: {on ? "on" : "off"}
        </span>
      </div>
    )
  },
}

/**
 * Interactive — settings panel pattern: 3 controlled toggles, each with
 * a label row. Live JSON readout below shows the full state.
 */
const SETTINGS = ["auto-ingest", "verbose logs", "compact mode"] as const
type Setting = (typeof SETTINGS)[number]

export const Interactive: Story = {
  render: function Interactive() {
    const [state, setState] = useState<Record<Setting, boolean>>({
      "auto-ingest": true,
      "verbose logs": false,
      "compact mode": false,
    })
    return (
      <div style={{ width: 280 }} className="flex flex-col gap-(--spacing-mm-8) p-(--spacing-mm-12)">
        {SETTINGS.map((key) => (
          <div key={key} className="flex items-center justify-between">
            <span className="font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted)]">
              {key}
            </span>
            <Toggle
              size="sm"
              on={state[key]}
              onChange={(next) => setState((s) => ({ ...s, [key]: next }))}
            />
          </div>
        ))}
        <pre className="mt-(--spacing-mm-8) font-mono text-mm-nano tracking-mm-label text-[var(--color-mm-muted-soft)] whitespace-pre-wrap">
{JSON.stringify(state, null, 2)}
        </pre>
      </div>
    )
  },
}
