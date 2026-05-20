import type { Meta, StoryObj } from "@storybook/react-vite"
import { useEffect, useState } from "react"
import {
  DataPair,
  DataPairLabel,
  DataPairValue,
  DataPairInline,
} from "@/components/megamax/data-pair"

const meta: Meta = {
  title: "Primitives/DataPair",
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj

export const Stacked: Story = {
  render: () => (
    <div style={{ width: 240 }} className="flex flex-col gap-(--spacing-mm-12) p-(--spacing-mm-12)">
      <DataPair>
        <DataPairLabel>vault size</DataPairLabel>
        <DataPairValue accent>4.3 GB</DataPairValue>
      </DataPair>
      <DataPair>
        <DataPairLabel>last ingest</DataPairLabel>
        <DataPairValue>12m ago</DataPairValue>
      </DataPair>
    </div>
  ),
}

/**
 * Interactive — live telemetry. Tokens count up, status cycles, last-ingest
 * stamp ticks. DataPair itself is presentational; this shows how it animates
 * when fed real-time values.
 */
export const Interactive: Story = {
  render: function Interactive() {
    const [tokens, setTokens] = useState(0)
    const [status, setStatus] = useState<"idle" | "ingesting" | "syncing">("idle")
    const [elapsed, setElapsed] = useState(0)
    useEffect(() => {
      const tokenT = setInterval(() => setTokens((n) => n + Math.floor(Math.random() * 30)), 600)
      const tickT = setInterval(() => setElapsed((n) => n + 1), 1000)
      const statusT = setInterval(() => {
        setStatus((s) => (s === "idle" ? "ingesting" : s === "ingesting" ? "syncing" : "idle"))
      }, 1800)
      return () => { clearInterval(tokenT); clearInterval(tickT); clearInterval(statusT) }
    }, [])
    return (
      <div style={{ width: 320 }} className="p-(--spacing-mm-12) flex flex-col">
        <DataPairInline label="created"  value={`${elapsed}s ago`} />
        <DataPairInline label="model"    value="qwen3-4b" accent />
        <DataPairInline label="tokens"   value={tokens.toLocaleString()} accent />
        <DataPairInline label="status"   value={status} />
      </div>
    )
  },
}

export const Inline: Story = {
  render: () => (
    <div style={{ width: 320 }} className="p-(--spacing-mm-12) flex flex-col">
      <DataPairInline label="created" value="2h 14m ago" />
      <DataPairInline label="model"   value="qwen3-4b" accent />
      <DataPairInline label="tokens"  value="847" />
      <DataPairInline label="status"  value="idle" />
    </div>
  ),
}
