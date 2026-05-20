import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  HudFrame,
  HudFrameHeaderStrip,
  HudFramePanel,
  HudFrameHeader,
} from "@/components/megamax/hud-frame"
import { Tag } from "@/components/megamax/tag"
import { TextLabel } from "@/components/megamax/text-label"
import { ScanProgressBar } from "@/components/megamax/scan-progress-bar"

const meta: Meta = {
  title: "Examples/03 · Scan Vault",
  parameters: { layout: "centered", magnify: false },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div style={{ width: 384 }}>
      <HudFrame mode="split">
        <HudFrameHeaderStrip>
          <HudFrameHeader>
            <div className="flex items-center gap-(--spacing-mm-8) font-mono font-normal text-mm-tiny text-[var(--color-mm-muted)] whitespace-nowrap">
              <span>MEMORY</span>
              <span>·</span>
              <span className="uppercase tracking-mm-label">CPU</span>
              <span>·</span>
              <span className="text-mm-nano text-[var(--color-mm-muted-soft)] tracking-mm-label uppercase">14:18:44 UTC</span>
            </div>
            <Tag type="badge" color="cyan">ARMED</Tag>
          </HudFrameHeader>
        </HudFrameHeaderStrip>

        <HudFramePanel>
          <p className="font-mono font-bold text-mm-lg uppercase text-[var(--color-mm-fg)]">SCAN VAULT</p>

          <div className="w-full flex flex-col items-start gap-(--spacing-mm-12)">
            <div className="w-full flex flex-col items-start gap-(--spacing-mm-6) font-mono font-normal text-mm-tiny leading-[1.5] whitespace-nowrap">
              <div className="w-full flex items-center gap-(--spacing-mm-6)">
                <span className="text-[var(--color-mm-muted-soft)]">ollama:</span>
                <span className="text-[var(--color-mm-muted)]">gemma4:e4b · idle 12% of cycle</span>
              </div>
              <div className="w-full flex items-center gap-(--spacing-mm-6)">
                <span className="text-[var(--color-mm-muted-soft)]">elapsed:</span>
                <span className="text-[var(--color-mm-muted)]">3m 02s · step 03</span>
              </div>
            </div>

            <div className="w-full flex items-center justify-between">
              <TextLabel>EVERYTHING ABOVE</TextLabel>
              <TextLabel>GAUGE IN SYSTEM TAB</TextLabel>
            </div>

            <ScanProgressBar loop />
          </div>
        </HudFramePanel>
      </HudFrame>
    </div>
  ),
}
