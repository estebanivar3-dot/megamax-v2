import type { Meta, StoryObj } from "@storybook/react-vite"

import { HudFrame } from "@/components/megamax/hud-frame"
import { ProgressBar } from "@/components/megamax/progress-bar"

const meta: Meta = {
  title: "Examples/07 · Python RSS",
  parameters: { layout: "centered", magnify: false },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div style={{ width: 206 }}>
      <HudFrame mode="solo">
        <div className="w-full flex items-center gap-(--spacing-mm-16)">
          <span className="flex-1 font-mono font-normal text-mm-tiny uppercase tracking-mm-label text-[var(--color-mm-muted)] whitespace-nowrap">
            python rss
          </span>
          <span className="font-mono font-normal text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-fg)] whitespace-nowrap">
            / 32 GB
          </span>
        </div>

        <div className="flex flex-col items-start gap-(--spacing-mm-6) uppercase">
          <div className="flex items-baseline gap-(--spacing-mm-6)">
            <p className="font-mono font-bold text-mm-lg text-[var(--color-mm-fg)]">7.3</p>
            <p className="font-mono font-normal text-mm-nano tracking-mm-label text-[var(--color-mm-muted-soft)]">GB</p>
          </div>
          <p className="font-mono font-normal text-mm-nano tracking-mm-label text-[var(--color-mm-muted-soft)] whitespace-nowrap">
            2,438 / 2,831
          </p>
        </div>

        <ProgressBar value={78} color="cyan" />
      </HudFrame>
    </div>
  ),
}
