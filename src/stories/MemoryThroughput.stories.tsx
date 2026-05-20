import type { Meta, StoryObj } from "@storybook/react-vite"

import { HudFrame } from "@/components/megamax/hud-frame"
import { Tag } from "@/components/megamax/tag"
import { LineLoader } from "@/components/megamax/line-loader"

const meta: Meta = {
  title: "Examples/08 · Memory 247",
  parameters: { layout: "centered", magnify: false },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div style={{ width: 352 }}>
      <HudFrame mode="solo">
        <div className="w-full flex items-center justify-between">
          <p className="font-mono font-normal text-mm-tiny uppercase tracking-mm-label text-[var(--color-mm-muted)]">MEMORY</p>
          <Tag type="badge" color="amber">ONLINE</Tag>
        </div>

        <div className="flex flex-col items-start gap-(--spacing-mm-6) uppercase whitespace-nowrap">
          <p className="font-mono font-bold text-mm-lg text-[var(--color-mm-fg)] leading-none">247</p>
          <p className="font-mono font-normal text-mm-nano tracking-mm-label text-[var(--color-mm-muted-soft)]">files / min</p>
        </div>

        <div className="w-full flex flex-col items-start gap-(--spacing-mm-8)">
          <LineLoader value={36} color="cyan" />
          <div className="w-full flex items-center justify-between font-mono font-normal text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted-soft)]">
            <span>280.50</span>
            <span>OF 564TB</span>
          </div>
        </div>

        <div className="w-full border-t border-dotted border-[var(--color-mm-border)]" />

        <div className="w-full flex items-start gap-(--spacing-mm-16)">
          <StatCell label="throughput" value="39%" sublabel="0 / 2,831" />
          <div className="border-l border-dotted border-[var(--color-mm-border)] self-stretch" />
          <StatCell label="VERIFY LINKS" value="118" sublabel="EXTRACT TAGS" />
          <div className="border-l border-dotted border-[var(--color-mm-border)] self-stretch" />
          <StatCell label="operation spec" value="03" sublabel="non-blocking" />
        </div>
      </HudFrame>
    </div>
  ),
}

function StatCell({ label, value, sublabel }: { label: string; value: string; sublabel: string }) {
  return (
    <div className="flex-1 min-w-px flex flex-col items-start gap-(--spacing-mm-8) leading-none">
      <p className="font-mono font-normal text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted)] w-full">
        {label}
      </p>
      <div className="flex flex-col items-start gap-(--spacing-mm-6) whitespace-nowrap">
        <p className="font-mono font-medium text-mm-md tracking-mm-title text-[var(--color-mm-fg)]">{value}</p>
        <p className="font-mono font-normal text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted-soft)]">{sublabel}</p>
      </div>
    </div>
  )
}
