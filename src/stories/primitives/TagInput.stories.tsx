import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { TagInput } from "@/components/megamax/tag-input"
import { Tag } from "@/components/megamax/tag"

const meta: Meta = {
  title: "Primitives/TagInput",
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj

export const Stateful: Story = {
  render: () => (
    <div style={{ width: 320 }} className="p-(--spacing-mm-12)">
      <TagInput defaultTags={["writing", "essay", "draft"]} />
    </div>
  ),
}

/**
 * Interactive — type and press Enter (or comma) to add a tag, Backspace
 * on the empty input to remove the trailing tag, click any tag to delete it.
 * Live JSON readout below shows the controlled value.
 */
export const Interactive: Story = {
  render: function Interactive() {
    const [tags, setTags] = useState<string[]>(["writing", "essay"])
    return (
      <div style={{ width: 360 }} className="flex flex-col gap-(--spacing-mm-12) p-(--spacing-mm-12)">
        <TagInput defaultTags={tags} onChange={setTags} />
        <div className="font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted-soft)] flex flex-col gap-(--spacing-mm-4)">
          <div className="flex justify-between">
            <span>count</span>
            <span className="text-[var(--color-mm-fg)]">{tags.length}</span>
          </div>
          <div className="flex justify-between">
            <span>tags</span>
            <span className="text-[var(--color-mm-fg)] normal-case">[{tags.join(", ")}]</span>
          </div>
        </div>
      </div>
    )
  },
}

export const Compact: Story = {
  render: () => (
    <div style={{ width: 320 }} className="p-(--spacing-mm-12)">
      <TagInput density="compact" defaultTags={["writing", "essay", "draft"]} />
    </div>
  ),
}

export const ContainerMode: Story = {
  render: () => (
    <div style={{ width: 320 }} className="p-(--spacing-mm-12)">
      <TagInput>
        <Tag type="tag" color="cyan">writing</Tag>
        <Tag type="tag" color="pink">essay</Tag>
        <Tag type="tag" color="amber">draft</Tag>
      </TagInput>
    </div>
  ),
}

export const EmptyWithPlaceholder: Story = {
  render: () => (
    <div style={{ width: 320 }} className="p-(--spacing-mm-12)">
      <TagInput defaultTags={[]} placeholder="add tags…" />
    </div>
  ),
}
