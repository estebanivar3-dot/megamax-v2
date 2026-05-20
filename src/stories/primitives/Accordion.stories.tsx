import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/megamax/accordion"

const meta: Meta<typeof Accordion> = {
  title: "Primitives/Accordion",
  component: Accordion,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Accordion>

/**
 * Default — single-open, collapsible. Click any trigger to toggle. Chevron
 * rotates 180° on open; body height animates smoothly via Radix's
 * `--radix-accordion-content-height` CSS var.
 */
export const Default: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Accordion type="single" collapsible defaultValue="appearance">
        <AccordionItem value="appearance">
          <AccordionTrigger>appearance</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-(--spacing-mm-4)">
              <Row label="theme"  value="dark" />
              <Row label="radius" value="0px" />
              <Row label="font"   value="geist mono" />
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="privacy">
          <AccordionTrigger>data &amp; privacy</AccordionTrigger>
          <AccordionContent>
            <p>All data is stored locally. No telemetry is collected.</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="notifications">
          <AccordionTrigger>notifications</AccordionTrigger>
          <AccordionContent>
            <p>Discovery run alerts, playlist sync status, and error reports.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}

/**
 * Multiple — multiple items can be open at once.
 */
export const Multiple: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Accordion type="multiple" defaultValue={["filters", "saved"]}>
        <AccordionItem value="filters">
          <AccordionTrigger>filters</AccordionTrigger>
          <AccordionContent>
            <p>Compose multiple filters with AND / OR. Empty values are ignored.</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="date">
          <AccordionTrigger>date range</AccordionTrigger>
          <AccordionContent>
            <p>Pick a start and end date.</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="saved">
          <AccordionTrigger>saved queries</AccordionTrigger>
          <AccordionContent>
            <p>No saved queries yet.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
}

/**
 * Interactive — controlled mode. Live readout shows which value is open.
 */
export const Interactive: Story = {
  render: function Interactive() {
    const [value, setValue] = useState<string | undefined>("filters")
    return (
      <div style={{ width: 360 }} className="flex flex-col gap-(--spacing-mm-12)">
        <Accordion type="single" collapsible value={value} onValueChange={(v) => setValue(v as string | undefined)}>
          <AccordionItem value="filters">
            <AccordionTrigger>filters</AccordionTrigger>
            <AccordionContent>
              <p>Compose AND / OR. Empty values are ignored.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="date">
            <AccordionTrigger>date range</AccordionTrigger>
            <AccordionContent>
              <p>Pick a start and end date.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="saved">
            <AccordionTrigger>saved queries</AccordionTrigger>
            <AccordionContent>
              <p>No saved queries yet.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted-soft)] flex justify-between">
          <span>open</span>
          <span className="text-[var(--color-mm-fg)]">{value ?? "—"}</span>
        </div>
      </div>
    )
  },
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="text-[var(--color-mm-fg)]">{value}</span>
    </div>
  )
}
