import type { Meta, StoryObj } from "@storybook/react-vite"

import { HudFrame } from "@/components/megamax/hud-frame"
import { ProgressBar } from "@/components/megamax/progress-bar"

const meta: Meta = {
  title: "Examples/06 · Memory Transfer",
  parameters: { layout: "centered", magnify: false },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div style={{ width: 206 }}>
      <HudFrame mode="solo">
        <div className="w-full flex flex-col items-start gap-(--spacing-mm-6) uppercase whitespace-nowrap">
          <p className="font-mono font-bold text-mm-tiny tracking-mm-title text-[var(--color-mm-fg)]">MEMORY</p>
          <p className="font-mono font-normal text-mm-nano tracking-mm-label text-[var(--color-mm-fg-soft)]">12.765.345 Files</p>
        </div>

        <div className="w-full flex items-start gap-(--spacing-mm-16) font-mono font-normal text-mm-nano tracking-mm-label uppercase whitespace-nowrap">
          <div className="flex-1 min-w-px flex flex-col items-start gap-(--spacing-mm-6)">
            <span className="text-[var(--color-mm-muted-soft)]">FROM</span>
            <span className="text-[var(--color-mm-fg-soft)]">LOCAL DRIVE</span>
          </div>
          <div className="flex-1 min-w-px flex flex-col items-start gap-(--spacing-mm-6)">
            <span className="text-[var(--color-mm-muted-soft)]">TO</span>
            <span className="text-[var(--color-mm-fg-soft)]">MEGAMAX LLC</span>
          </div>
        </div>

        <ProgressBar value={78} color="cyan" />
      </HudFrame>
    </div>
  ),
}
