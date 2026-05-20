import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/megamax/card"
import { Button } from "@/components/megamax/button"
import { Tag } from "@/components/megamax/tag"
import { IndexRow, IndexRowSection } from "@/components/megamax/index-row"
import {
  InlineEditField,
  InlineEditInput,
} from "@/components/megamax/inline-edit"

const meta: Meta<typeof Card> = {
  title: "Primitives/Card",
  component: Card,
  parameters: { layout: "centered" },
  argTypes: {
    size: { control: "select", options: ["sm", "md"] },
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card style={{ width: 420 }}>
      <CardHeader>
        <CardTitle>RECENT BATCH</CardTitle>
        <CardDescription>
          Aramaki finished synthesizing 12 captures across 3 buckets. No errors.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-mm-tiny text-[var(--color-mm-muted)] leading-[1.5]">
          Promoted 4 raw entries to the wiki tier. Remaining items are queued
          for the next reactive pass.
        </p>
      </CardContent>
    </Card>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Card style={{ width: 460 }}>
      <CardHeader>
        <div>
          <CardTitle>FILE 7-A</CardTitle>
          <CardDescription>casebook · last edited 22 min ago</CardDescription>
        </div>
        <CardAction>
          <Tag type="badge" color="amber">QUEUED</Tag>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-mm-tiny text-[var(--color-mm-muted)] leading-[1.5]">
          Compiled from 3 Kusanagi captures. Awaiting Aramaki distill pass to
          settle the canonical slug.
        </p>
      </CardContent>
    </Card>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Card style={{ width: 460 }}>
      <CardHeader>
        <CardTitle>PROMOTE TO WIKI</CardTitle>
        <CardDescription>
          This will mark the raw entry as ingested and move its slug into the
          canonical wiki index.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <InlineEditField label="slug">
          <InlineEditInput
            size="sm"
            defaultValue="kb/wiki/rookie-edge-polymarket"
          />
        </InlineEditField>
      </CardContent>
      <CardFooter className="justify-end gap-(--spacing-mm-8)">
        <Button color="dark">CANCEL</Button>
        <Button color="blue">PROMOTE</Button>
      </CardFooter>
    </Card>
  ),
}

/**
 * Split — header sits in its own strip with a bottom border, body region
 * below. Mirrors HudFrame's split mode but without corner brackets.
 */
export const Split: Story = {
  render: () => (
    <Card variant="split" style={{ width: 560 }}>
      <CardHeader>
        <CardTitle>FILE 7-A · CASEBOOK</CardTitle>
        <CardAction>
          <Tag type="badge" color="cyan">PROCESSING</Tag>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-mm-tiny text-[var(--color-mm-muted)] leading-[1.5]">
          Compiled from 3 Kusanagi captures. Header sits in its own strip with
          a bottom border; body lives below. Same vibe as HudFrame split mode,
          no corner brackets.
        </p>
      </CardContent>
      <CardFooter className="justify-end gap-(--spacing-mm-8)">
        <Button color="dark">CANCEL</Button>
        <Button color="blue">PROMOTE</Button>
      </CardFooter>
    </Card>
  ),
}

export const Compact: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Card {...args} style={{ width: 320 }}>
      <CardHeader>
        <CardTitle>UPTIME</CardTitle>
        <CardDescription>last 24h</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-mono font-bold text-[28px] tracking-mm-title text-[var(--color-mm-fg)]">
          99.97<span className="text-[var(--color-mm-muted-soft)]">%</span>
        </p>
      </CardContent>
    </Card>
  ),
}

/**
 * Composed — Card hosting an IndexRow list. Shows that Card doesn't impose its
 * own gap on contained components — they keep their own rhythm.
 */
export const Composed: Story = {
  render: () => (
    <Card style={{ width: 640 }}>
      <CardHeader>
        <CardTitle>INTAKE QUEUE</CardTitle>
        <CardAction>
          <Tag type="badge" color="green">LIVE</Tag>
        </CardAction>
      </CardHeader>
      <CardContent>
        <IndexRowSection label="recent batch events" meta="3" />
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
          trailing="14:04 UTC"
        />
        <IndexRow
          id="03"
          label="kb/raw/screenshot/glyph-interface.md"
          markerColor="amber"
          status={{ color: "amber", label: "QUEUED" }}
          trailing="22 min"
        />
      </CardContent>
      <CardFooter className="justify-end gap-(--spacing-mm-8)">
        <Button color="dark">PAUSE</Button>
        <Button color="blue">RUN NOW</Button>
      </CardFooter>
    </Card>
  ),
}

export const Grid: Story = {
  render: () => (
    <div
      className="grid grid-cols-2 gap-(--spacing-mm-12) p-(--spacing-mm-12)"
      style={{ width: 720 }}
    >
      <Card size="sm">
        <CardHeader>
          <CardTitle>INGESTED</CardTitle>
          <CardDescription>last 24h</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-mono font-bold text-[24px] text-[var(--color-mm-fg)]">42</p>
        </CardContent>
      </Card>
      <Card size="sm">
        <CardHeader>
          <CardTitle>QUEUED</CardTitle>
          <CardDescription>awaiting distill</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-mono font-bold text-[24px] text-[var(--color-mm-amber)]">7</p>
        </CardContent>
      </Card>
      <Card size="sm">
        <CardHeader>
          <CardTitle>PROMOTED</CardTitle>
          <CardDescription>to wiki tier</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-mono font-bold text-[24px] text-[var(--color-mm-green)]">18</p>
        </CardContent>
      </Card>
      <Card size="sm">
        <CardHeader>
          <CardTitle>BURNED</CardTitle>
          <CardDescription>spam / noise</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="font-mono font-bold text-[24px] text-[var(--color-mm-muted-soft)]">3</p>
        </CardContent>
      </Card>
    </div>
  ),
}
