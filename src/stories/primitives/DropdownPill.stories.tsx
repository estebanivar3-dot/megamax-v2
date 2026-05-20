import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { DropdownPill } from "@/components/megamax/dropdown-pill"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const meta: Meta<typeof DropdownPill> = {
  title: "Primitives/DropdownPill",
  component: DropdownPill,
  parameters: { layout: "centered" },
  argTypes: {
    type: { control: "select", options: ["stroke", "fill", "negative", "ghost"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
}

export default meta
type Story = StoryObj<typeof DropdownPill>

export const Stroke: Story = { args: { type: "stroke", children: "Dropdown" } }
export const Fill: Story = { args: { type: "fill", children: "Halftone" } }
export const Negative: Story = { args: { type: "negative", children: "Selected" } }
export const Ghost: Story = { args: { type: "ghost", children: "Effects" } }

export const Types: Story = {
  name: "All types · md",
  render: () => (
    <div className="flex items-center gap-(--spacing-mm-8)">
      <DropdownPill type="stroke">Dropdown</DropdownPill>
      <DropdownPill type="fill">Halftone</DropdownPill>
      <DropdownPill type="negative">Selected</DropdownPill>
      <DropdownPill type="ghost">Effects</DropdownPill>
    </div>
  ),
}

export const Sizes: Story = {
  name: "All sizes · stroke",
  render: () => (
    <div className="flex items-center gap-(--spacing-mm-12)">
      <DropdownPill size="sm">Dropdown</DropdownPill>
      <DropdownPill size="md">Dropdown</DropdownPill>
      <DropdownPill size="lg">Dropdown</DropdownPill>
    </div>
  ),
}

const FILTERS = ["Halftone", "Bayer", "Atkinson", "Floyd-Steinberg", "Stucki"] as const

export const Interactive: Story = {
  name: "Interactive · with menu",
  render: function Interactive() {
    const [value, setValue] = useState<typeof FILTERS[number]>("Halftone")
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <DropdownPill type="stroke">{value}</DropdownPill>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-[160px]">
          {FILTERS.map((f) => (
            <DropdownMenuItem
              key={f}
              onSelect={() => setValue(f)}
              data-selected={f === value}
              className={f === value ? "text-[var(--color-mm-brand)]" : undefined}
            >
              {f}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}
