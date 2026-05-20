import type { Meta, StoryObj } from "@storybook/react-vite"
import { ScrollArea } from "@/components/megamax/scroll-area"

const meta: Meta<typeof ScrollArea> = {
  title: "Primitives/ScrollArea",
  component: ScrollArea,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof ScrollArea>

const fillerLines = Array.from({ length: 40 }, (_, i) => `LINE ${String(i + 1).padStart(3, "0")} · brutalist scrollbar demo · the quick brown fox jumps over the lazy dog`)

export const Default: Story = {
  args: { maxHeight: 200 },
  render: (args) => (
    <ScrollArea
      {...args}
      className="w-[320px] border border-[var(--color-mm-border)] bg-[var(--color-mm-bg)]"
    >
      <ul className="flex flex-col gap-(--spacing-mm-6) p-(--spacing-mm-12) font-mono text-mm-tiny text-[var(--color-mm-muted)] uppercase tracking-mm-label">
        {fillerLines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </ScrollArea>
  ),
}

export const ShortContent: Story = {
  name: "Short content · no scrollbar",
  args: { maxHeight: 200 },
  render: (args) => (
    <ScrollArea
      {...args}
      className="w-[320px] border border-[var(--color-mm-border)] bg-[var(--color-mm-bg)]"
    >
      <p className="p-(--spacing-mm-12) font-mono text-mm-tiny text-[var(--color-mm-muted)]">
        Content fits inside maxHeight, so the scrollbar never appears.
      </p>
    </ScrollArea>
  ),
}

export const AlwaysVisible: Story = {
  name: 'type="always"',
  args: { maxHeight: 200, type: "always" },
  render: (args) => (
    <ScrollArea
      {...args}
      className="w-[320px] border border-[var(--color-mm-border)] bg-[var(--color-mm-bg)]"
    >
      <ul className="flex flex-col gap-(--spacing-mm-6) p-(--spacing-mm-12) font-mono text-mm-tiny text-[var(--color-mm-muted)] uppercase tracking-mm-label">
        {fillerLines.slice(0, 15).map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </ScrollArea>
  ),
}
