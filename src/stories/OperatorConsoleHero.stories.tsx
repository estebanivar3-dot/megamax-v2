import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"

import {
  HudFrame,
  HudFrameHeader,
} from "@/components/megamax/hud-frame"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  InlineEditField,
  InlineEditInput,
  InlineEditHero,
} from "@/components/megamax/inline-edit"
import { TagInput } from "@/components/megamax/tag-input"
import { Tag } from "@/components/megamax/tag"
import { DataPairInline } from "@/components/megamax/data-pair"
import { Button, ButtonGroup, ButtonAction, ButtonExtra } from "@/components/megamax/button"

const meta: Meta = {
  title: "Examples/02 · Operator Console Hero",
  parameters: { layout: "centered", magnify: false },
}

export default meta
type Story = StoryObj

const DRAFT_STATUSES = ["DRAFT", "REVIEWING", "PUBLISHED", "ARCHIVED", "FROZEN"] as const
type DraftStatus = (typeof DRAFT_STATUSES)[number]

function DemoBody() {
  const [draftStatus, setDraftStatus] = React.useState<DraftStatus>("DRAFT")
  return (
    <div style={{ width: 363 }}>
      <HudFrame mode="solo">
        <HudFrameHeader>
          <span className="font-mono font-normal text-mm-tiny uppercase tracking-mm-label text-[var(--color-mm-muted)]">
            file 7-A / casebook
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button color="dark">{draftStatus}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={6}
              className="min-w-[160px] p-(--spacing-mm-4) rounded-none ring-0 before:hidden bg-[var(--color-mm-bg)] border border-[var(--color-mm-border)] shadow-[var(--shadow-mm-label)] font-mono"
            >
              {DRAFT_STATUSES.map((s) => (
                <DropdownMenuItem
                  key={s}
                  onSelect={() => setDraftStatus(s)}
                  className={
                    "rounded-none px-(--spacing-mm-4) py-(--spacing-mm-4) text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted)] flex items-center justify-between gap-(--spacing-mm-6) " +
                    "focus:bg-[var(--color-mm-surface)] focus:text-[var(--color-mm-fg)] " +
                    (s === draftStatus ? "!text-[var(--color-mm-cyan)]" : "")
                  }
                >
                  <span>{s}</span>
                  <span
                    aria-hidden
                    className={
                      "inline-block size-[4px] shrink-0 " +
                      (s === draftStatus ? "bg-[var(--color-mm-cyan)]" : "bg-transparent")
                    }
                  />
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </HudFrameHeader>

        <div className="w-full flex flex-col items-start gap-(--spacing-mm-12)">
          <InlineEditField label="NAME">
            <InlineEditHero defaultValue="LMK / Operator Console" />
          </InlineEditField>

          <InlineEditField label="current focus">
            <InlineEditInput size="sm" defaultValue="The Privatized Past" />
          </InlineEditField>

          <InlineEditField label="TAGS">
            <TagInput density="default" defaultTags={["writing", "essay", "draft"]} />
          </InlineEditField>
        </div>

        <div className="w-full flex flex-col items-start gap-(--spacing-mm-8)">
          <div className="w-full flex items-center justify-between">
            <span className="font-mono font-normal text-mm-nano uppercase tracking-mm-section text-[var(--color-mm-fg)]">at a glance</span>
            <span className="font-mono font-normal text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted)]">last sync 12m</span>
          </div>
          <div className="w-full flex flex-col items-start">
            <DataPairInline label="created" value="2h 14m ago" />
            <DataPairInline label="model" value="qwen3-4b" accent />
            <DataPairInline label="tokens" value="847" />
          </div>
        </div>

        <div className="w-full flex items-center justify-end gap-[10px]">
          <Button color="dark">BACK</Button>
          <ButtonGroup color="blue">
            <ButtonAction color="blue">PROMOTE TO WIKI</ButtonAction>
            <ButtonExtra color="blue">SPACE</ButtonExtra>
          </ButtonGroup>
        </div>
      </HudFrame>
    </div>
  )
}

export const Default: Story = {
  render: () => <DemoBody />,
}
