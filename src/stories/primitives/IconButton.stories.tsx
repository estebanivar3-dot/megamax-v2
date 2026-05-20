import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import {
  ArrowUp,
  Close,
  Pause,
  Play,
  Reload,
  Plus,
  Minus,
  Mouse,
  Edit,
  Paperclip,
  Zap,
  Trash,
} from "@nsmr/pixelart-react"
import { IconButton } from "@/components/megamax/icon-button"

const meta: Meta<typeof IconButton> = {
  title: "Primitives/IconButton",
  component: IconButton,
  parameters: { layout: "centered" },
  argTypes: {
    color: { control: "select", options: ["blue", "dark", "ghost"] },
  },
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Blue: Story = {
  args: { color: "blue", "aria-label": "Submit", children: <ArrowUp /> },
}

export const Dark: Story = {
  args: { color: "dark", "aria-label": "Close", children: <Close /> },
}

export const Ghost: Story = {
  args: { color: "ghost", "aria-label": "Clear", children: <Trash /> },
}

export const IconSet: Story = {
  name: "Icon set · row",
  render: () => (
    <div className="flex items-center gap-(--spacing-mm-8)">
      <IconButton color="dark" aria-label="Submit"><ArrowUp /></IconButton>
      <IconButton color="dark" aria-label="Close"><Close /></IconButton>
      <IconButton color="dark" aria-label="Pause"><Pause /></IconButton>
      <IconButton color="dark" aria-label="Play"><Play /></IconButton>
      <IconButton color="dark" aria-label="Reload"><Reload /></IconButton>
      <IconButton color="dark" aria-label="Zap"><Zap /></IconButton>
      <IconButton color="dark" aria-label="Trash"><Trash /></IconButton>
    </div>
  ),
}

export const Toolbar: Story = {
  name: "Toolbar · ghost cluster",
  render: () => (
    <div className="inline-flex items-stretch border border-[var(--color-mm-border)] bg-[var(--color-mm-surface)] shadow-[var(--shadow-mm-label-strong)]">
      <IconButton color="ghost" aria-label="Cursor"><Mouse /></IconButton>
      <IconButton color="ghost" aria-label="Edit"><Edit /></IconButton>
      <IconButton color="ghost" aria-label="Attach"><Paperclip /></IconButton>
      <IconButton color="ghost" aria-label="Zap"><Zap /></IconButton>
      <IconButton color="ghost" aria-label="Trash"><Trash /></IconButton>
    </div>
  ),
}

export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-mm-12) p-(--spacing-mm-12)">
      <div className="flex items-center gap-(--spacing-mm-8)">
        <IconButton color="blue"  aria-label="Submit"><ArrowUp /></IconButton>
        <IconButton color="dark"  aria-label="Close"><Close /></IconButton>
        <IconButton color="ghost" aria-label="Clear"><Trash /></IconButton>
      </div>
      <div className="flex items-center gap-(--spacing-mm-8)">
        <IconButton color="blue"  aria-label="Play"><Play /></IconButton>
        <IconButton color="dark"  aria-label="Pause"><Pause /></IconButton>
        <IconButton color="ghost" aria-label="Reload"><Reload /></IconButton>
      </div>
    </div>
  ),
}

export const Interactive: Story = {
  render: function Interactive() {
    const [count, setCount] = useState(0)
    return (
      <div className="flex items-center gap-(--spacing-mm-12)">
        <IconButton
          color="blue"
          aria-label="Increment"
          onClick={() => setCount((n) => n + 1)}
        >
          <Plus />
        </IconButton>
        <IconButton
          color="dark"
          aria-label="Decrement"
          onClick={() => setCount((n) => n - 1)}
        >
          <Minus />
        </IconButton>
        <IconButton
          color="ghost"
          aria-label="Reset"
          onClick={() => setCount(0)}
        >
          <Reload />
        </IconButton>
        <span className="font-mono text-mm-tiny uppercase tracking-mm-label text-[var(--color-mm-muted)]">
          count: <span className="text-[var(--color-mm-fg)]">{count}</span>
        </span>
      </div>
    )
  },
}
