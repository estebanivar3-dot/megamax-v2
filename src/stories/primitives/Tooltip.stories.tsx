import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "@/components/megamax/button"

const meta: Meta = {
  title: "Primitives/Tooltip",
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button color="dark">HOVER ME</Button>
      </TooltipTrigger>
      <TooltipContent>promote to wiki</TooltipContent>
    </Tooltip>
  ),
}

export const Positions: Story = {
  render: () => (
    <div className="grid grid-cols-3 grid-rows-3 gap-(--spacing-mm-16) p-(--spacing-mm-32)" style={{ width: 540 }}>
      <div />
      <PositionedTooltip side="top" label="top" />
      <div />

      <PositionedTooltip side="left" label="left" />
      <div className="flex items-center justify-center font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted-soft)]">
        sides
      </div>
      <PositionedTooltip side="right" label="right" />

      <div />
      <PositionedTooltip side="bottom" label="bottom" />
      <div />
    </div>
  ),
}

function PositionedTooltip({
  side,
  label,
}: {
  side: "top" | "right" | "bottom" | "left"
  label: string
}) {
  return (
    <div className="flex items-center justify-center">
      <Tooltip open>
        <TooltipTrigger asChild>
          <Button color="dark">{label.toUpperCase()}</Button>
        </TooltipTrigger>
        <TooltipContent side={side}>tooltip on {side}</TooltipContent>
      </Tooltip>
    </div>
  )
}

export const WithKbd: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button color="dark">SAVE</Button>
      </TooltipTrigger>
      <TooltipContent>
        save draft
        <kbd className="px-(--spacing-mm-4) py-[1px] border border-[var(--color-mm-bg)]/30 text-[10px]">
          ⌘S
        </kbd>
      </TooltipContent>
    </Tooltip>
  ),
}
