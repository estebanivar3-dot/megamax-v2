import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { IndexRow, IndexRowSection } from "@/components/megamax/index-row"
import { Button } from "@/components/megamax/button"
import type { TagColor } from "@/components/megamax/tag"
import type { IndexRowMarkerColor } from "@/components/megamax/index-row"

const meta: Meta = {
  title: "Primitives/IndexRow",
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj

export const SectionHeader: Story = {
  render: () => (
    <div style={{ width: 720 }}>
      <IndexRowSection label="recent batch events" meta="LIVE" />
    </div>
  ),
}

export const DataRow: Story = {
  render: () => (
    <div style={{ width: 720 }} className="flex flex-col gap-(--spacing-mm-8)">
      <IndexRow
        id="01"
        label="kb/raw/tweet/rookie-edge-polymarket.md"
        markerColor="green"
        status={{ color: "green", label: "DONE" }}
        trailing="07h 12m"
      />
    </div>
  ),
}

/**
 * Interactive — click a row to advance its status: queued → processing → done.
 * Marker color and status pill update on every click. Section header tracks
 * how many rows are done.
 */
type RowState = "queued" | "processing" | "done"
const stateMap: Record<RowState, { color: TagColor; marker: IndexRowMarkerColor; label: string }> = {
  queued:     { color: "amber",  marker: "amber",  label: "QUEUED" },
  processing: { color: "cyan",   marker: "cyan",   label: "PROCESSING" },
  done:       { color: "green",  marker: "green",  label: "DONE" },
}
const order: RowState[] = ["queued", "processing", "done"]

export const Interactive: Story = {
  render: function Interactive() {
    const [rows, setRows] = useState<RowState[]>(["queued", "processing", "done", "queued"])
    const advance = (i: number) =>
      setRows((rs) => rs.map((s, idx) => (idx === i ? order[(order.indexOf(s) + 1) % 3] : s)))
    const doneCount = rows.filter((s) => s === "done").length
    return (
      <div style={{ width: 780 }} className="flex flex-col gap-(--spacing-mm-12) p-(--spacing-mm-12)">
        <IndexRowSection label="batch — click any row to advance" meta={`${doneCount}/${rows.length} DONE`} />
        {rows.map((s, i) => {
          const cfg = stateMap[s]
          return (
            <IndexRow
              key={i}
              id={String(i + 1).padStart(2, "0")}
              label={`kb/raw/tweet/row-${i + 1}.md`}
              markerColor={cfg.marker}
              status={{ color: cfg.color, label: cfg.label }}
              trailing={s === "done" ? "07h 12m" : s === "processing" ? "14:04 UTC" : "—"}
              onClick={() => advance(i)}
            />
          )
        })}
      </div>
    )
  },
}

export const Variants: Story = {
  render: () => (
    <div style={{ width: 780 }} className="flex flex-col gap-(--spacing-mm-12) p-(--spacing-mm-12)">
      <IndexRowSection label="recent batch events" meta="LIVE" />
      <IndexRow
        id="01"
        label="kb/raw/tweet/rookie-edge-polymarket.md"
        markerColor="green"
        status={{ color: "green", label: "DONE" }}
        trailing="07h 12m"
      />
      <IndexRow
        id="02"
        label="kb/raw/article/huggingface-tool-builder.md"
        markerColor="cyan"
        status={{ color: "cyan", label: "PROCESSING" }}
        trailing="14:04:12 UTC"
      />
      <IndexRow
        id="03"
        label="kb/raw/screenshot/glyph-interface.md"
        markerColor="amber"
        status={{ color: "amber", label: "QUEUED" }}
        trailing="22 min"
      />
      <IndexRow
        id="—"
        label="kb/raw/burned/spam.md"
        markerColor="muted"
        muted
        trailing="3 days ago"
      />
      <IndexRow
        id="04"
        label="interactive row"
        markerColor="purple"
        trailing={
          <Button color="dark" onClick={() => alert("row clicked")}>
            OPEN
          </Button>
        }
      />
    </div>
  ),
}
