import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Tag, type TagColor } from "@/components/megamax/tag"
import { Button } from "@/components/megamax/button"

const meta: Meta<typeof Tag> = {
  title: "Primitives/Tag",
  component: Tag,
  parameters: { layout: "centered" },
  argTypes: {
    type:  { control: "select", options: ["badge", "tag", "simple-tag"] },
    color: { control: "select", options: ["cyan", "green", "pink", "amber", "purple"] },
    state: { control: "select", options: ["default", "disabled"] },
  },
}

export default meta
type Story = StoryObj<typeof Tag>

export const Badge: Story = {
  args: { type: "badge", color: "cyan", children: "ARMED" },
}

export const TagChip: Story = {
  args: { type: "tag", color: "cyan", children: "WRITING" },
}

export const SimpleTagChip: Story = {
  args: { type: "simple-tag", color: "amber", children: "draft" },
}

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-mm-12) p-(--spacing-mm-12)">
      <div className="flex gap-(--spacing-mm-8) items-center">
        <Tag type="badge" color="cyan">PROCESSING</Tag>
        <Tag type="badge" color="green">DONE</Tag>
        <Tag type="badge" color="amber">ONLINE</Tag>
        <Tag type="badge" color="pink">ERROR</Tag>
        <Tag type="badge" color="purple">QUEUED</Tag>
      </div>
      <div className="flex gap-(--spacing-mm-8) items-center">
        <Tag type="tag" color="cyan">writing</Tag>
        <Tag type="tag" color="green">notes</Tag>
        <Tag type="tag" color="amber">draft</Tag>
        <Tag type="tag" color="pink">essay</Tag>
        <Tag type="tag" color="purple">research</Tag>
      </div>
      <div className="flex gap-(--spacing-mm-4) items-center">
        <Tag type="simple-tag" color="cyan">writing</Tag>
        <Tag type="simple-tag" color="green">notes</Tag>
        <Tag type="simple-tag" color="amber">draft</Tag>
        <Tag type="simple-tag" color="pink">essay</Tag>
        <Tag type="simple-tag" color="purple">research</Tag>
      </div>
    </div>
  ),
}

/**
 * Interactive — add/remove cycle with the chip color cycling per click.
 * Hover a simple-tag to see the × appear without reserving layout space.
 */
const cycle: TagColor[] = ["cyan", "green", "amber", "pink", "purple"]

export const Interactive: Story = {
  render: function Interactive() {
    const [tags, setTags] = useState<Array<{ id: number; label: string; color: TagColor }>>([
      { id: 1, label: "writing", color: "cyan" },
      { id: 2, label: "essay",   color: "pink" },
      { id: 3, label: "draft",   color: "amber" },
    ])
    const [next, setNext] = useState(4)
    return (
      <div className="flex flex-col gap-(--spacing-mm-12) p-(--spacing-mm-12) min-w-[320px]">
        <div className="flex flex-wrap gap-(--spacing-mm-8) min-h-[28px]">
          {tags.map((t) => (
            <Tag
              key={t.id}
              type="tag"
              color={t.color}
              onRemove={() => setTags((arr) => arr.filter((x) => x.id !== t.id))}
            >
              {t.label}
            </Tag>
          ))}
          {tags.length === 0 && (
            <span className="font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted-soft)]">
              empty — add some
            </span>
          )}
        </div>
        <div className="flex gap-(--spacing-mm-4)">
          <Button
            color="blue"
            onClick={() => {
              const color = cycle[next % cycle.length]
              setTags((arr) => [...arr, { id: next, label: `tag-${next}`, color }])
              setNext((n) => n + 1)
            }}
          >
            ADD TAG
          </Button>
          <Button color="dark" onClick={() => setTags([])}>
            CLEAR
          </Button>
        </div>
        <span className="font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted-soft)]">
          count: <span className="text-[var(--color-mm-fg)]">{tags.length}</span>
        </span>
      </div>
    )
  },
}

export const Removable: Story = {
  render: function Removable() {
    return (
      <div className="flex gap-(--spacing-mm-8) items-center p-(--spacing-mm-12) min-h-[60px]">
        <Tag type="tag" color="cyan" onRemove={() => {}}>
          click me to remove
        </Tag>
        <Tag type="simple-tag" color="pink" onRemove={() => {}}>
          hover me
        </Tag>
      </div>
    )
  },
}

export const Disabled: Story = {
  args: { type: "badge", color: "cyan", state: "disabled", children: "DISABLED" },
}
