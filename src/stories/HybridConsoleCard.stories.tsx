import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  HudFrame,
  HudFrameHeaderStrip,
  HudFramePanel,
  HudFrameHeader,
  HudFrameBody,
} from "@/components/megamax/hud-frame"
import { TextLabel } from "@/components/megamax/text-label"
import { Tag } from "@/components/megamax/tag"
import { TagInput } from "@/components/megamax/tag-input"
import { ButtonAction } from "@/components/megamax/button"

const meta: Meta = {
  title: "Examples/04 · Hybrid Console Surface",
  parameters: { layout: "centered", magnify: false },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div style={{ width: 321 }}>
      <HudFrame mode="split">
        <HudFrameHeaderStrip>
          <HudFrameHeader>
            <div className="flex items-center gap-(--spacing-mm-8) font-mono text-mm-tiny whitespace-nowrap">
              <span className="font-normal text-[var(--color-mm-muted)]">03</span>
              <span className="font-bold uppercase tracking-mm-title text-[var(--color-mm-fg)]">HYBRID CONSOLE</span>
            </div>
            <div className="flex items-center gap-(--spacing-mm-8)">
              <span className="font-mono font-normal text-mm-tiny uppercase tracking-mm-label text-[var(--color-mm-muted)] whitespace-nowrap">
                /dashboard-v3
              </span>
              <TextLabel>⌘3</TextLabel>
            </div>
          </HudFrameHeader>
        </HudFrameHeaderStrip>

        <HudFramePanel>
          <HudFrameBody>
            <p className="font-mono font-normal text-mm-tiny uppercase tracking-mm-title text-[var(--color-mm-cyan)] whitespace-nowrap">
              v3 · monitor + operate · canonical target
            </p>
            <p className="w-full font-mono font-normal text-mm-tiny leading-[1.5] text-[var(--color-mm-muted)]">
              Best-of-both: HudStatusBar + Notched operator hero + 4 BentoCell hero stats + tabs (Intake/Distill/Wiki/System) + bottom summary.
            </p>
          </HudFrameBody>

          <div className="w-full flex flex-col items-start gap-(--spacing-mm-6)">
            <span className="font-mono font-normal text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted-soft)]">TAGS</span>
            <TagInput density="compact" defaultTags={["writing", "essay", "draft"]} />
          </div>

          <div className="w-full flex items-center justify-end gap-[10px]">
            <ButtonAction color="dark" subType="dot">CANCEL</ButtonAction>
            <ButtonAction color="blue">APPROVE</ButtonAction>
          </div>
        </HudFramePanel>
      </HudFrame>
    </div>
  ),
}
