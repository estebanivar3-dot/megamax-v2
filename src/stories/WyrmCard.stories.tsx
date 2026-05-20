import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  HudFrame,
  HudFrameHeaderStrip,
  HudFramePanel,
  HudFrameHeader,
} from "@/components/megamax/hud-frame"
import { Toggle } from "@/components/megamax/toggle"

const meta: Meta = {
  title: "Examples/05 · WYRM",
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
            <p className="font-mono font-bold text-mm-tiny uppercase tracking-mm-title text-[var(--color-mm-fg)] whitespace-nowrap">
              WYRM
            </p>
            <p className="font-mono font-normal text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted-soft)] whitespace-nowrap">
              06:04:11 — last.fm
            </p>
          </HudFrameHeader>
        </HudFrameHeaderStrip>

        <HudFramePanel>
          <div className="w-full flex flex-col items-start gap-(--spacing-mm-6)">
            <span className="font-mono font-normal text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-fg)] whitespace-nowrap">
              TRACK
            </span>
            <Row label="track:" value="Boy Harsher — Pain II" valueClass="text-[var(--color-mm-green)]" />
            <Row label="elapssource:ed:" value="wyrm-daily-2026-05-12.m3u" />
            <Row label="depth:" value="3 nbrs from drab majesty" />
          </div>

          <div className="w-full flex flex-col items-start gap-(--spacing-mm-6)">
            <span className="font-mono font-normal text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-fg)] whitespace-nowrap">
              SETTINGS
            </span>
            <SettingRow label="Wifi" defaultOn={false} />
            <SettingRow label="Bluetooth" defaultOn />
          </div>
        </HudFramePanel>
      </HudFrame>
    </div>
  ),
}

function Row({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="w-full flex items-center gap-(--spacing-mm-6) font-mono font-normal text-mm-tiny leading-[1.5] whitespace-nowrap">
      <span className="text-[var(--color-mm-muted-soft)]">{label}</span>
      <span className={valueClass ?? "text-[var(--color-mm-muted)]"}>{value}</span>
    </div>
  )
}

function SettingRow({ label, defaultOn }: { label: string; defaultOn: boolean }) {
  return (
    <div className="w-full flex items-center gap-(--spacing-mm-6)">
      <span className="flex-1 font-mono font-normal text-mm-tiny leading-[1.5] text-[var(--color-mm-muted)] whitespace-nowrap">
        {label}
      </span>
      <Toggle defaultOn={defaultOn} size="sm" />
    </div>
  )
}
