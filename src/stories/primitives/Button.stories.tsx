import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import {
  Button,
  ButtonAction,
  ButtonGroup,
  ButtonExtra,
} from "@/components/megamax/button"

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  parameters: { layout: "centered" },
  argTypes: {
    color:   { control: "select", options: ["blue", "dark"] },
    subType: { control: "select", options: ["text", "icon", "dot", "none"] },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Blue: Story = {
  args: { color: "blue", children: "PROMOTE TO WIKI" },
}

export const Dark: Story = {
  args: { color: "dark", children: "BACK" },
}

export const DarkWithDot: Story = {
  args: { color: "dark", subType: "dot", children: "CANCEL" },
}

export const Split: Story = {
  render: () => (
    <ButtonGroup color="blue">
      <ButtonAction color="blue">PROMOTE TO WIKI</ButtonAction>
      <ButtonExtra color="blue">SPACE</ButtonExtra>
    </ButtonGroup>
  ),
}

export const SplitDark: Story = {
  render: () => (
    <ButtonGroup color="dark">
      <ButtonAction color="dark">DEFER</ButtonAction>
      <ButtonExtra color="dark"><span className="inline-flex items-center justify-center gap-[3px] leading-none"><span className="text-mm-sm leading-none translate-y-[0.5px]">⌘</span><span className="leading-none">D</span></span></ButtonExtra>
    </ButtonGroup>
  ),
}

/**
 * Interactive — click counters + ButtonGroup hover sync.
 * Hover either half of a ButtonGroup and both halves light up together
 * (shared `group` parent). Click counts persist across the whole group.
 */
export const Interactive: Story = {
  render: function Interactive() {
    const [promotes, setPromotes] = useState(0)
    const [defers, setDefers] = useState(0)
    return (
      <div className="flex flex-col gap-(--spacing-mm-12) p-(--spacing-mm-12) items-start">
        <div className="flex items-center gap-(--spacing-mm-12)">
          <ButtonGroup color="blue">
            <ButtonAction color="blue" onClick={() => setPromotes((n) => n + 1)}>
              PROMOTE TO WIKI
            </ButtonAction>
            <ButtonExtra color="blue" onClick={() => setPromotes((n) => n + 1)}>
              SPACE
            </ButtonExtra>
          </ButtonGroup>
          <span className="font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted)]">
            promotes: <span className="text-[var(--color-mm-fg)]">{promotes}</span>
          </span>
        </div>
        <div className="flex items-center gap-(--spacing-mm-12)">
          <ButtonGroup color="dark">
            <ButtonAction color="dark" subType="dot" onClick={() => setDefers((n) => n + 1)}>
              DEFER
            </ButtonAction>
            <ButtonExtra color="dark" onClick={() => setDefers((n) => n + 1)}>
              <span className="inline-flex items-center justify-center gap-[3px] leading-none"><span className="text-mm-sm leading-none translate-y-[0.5px]">⌘</span><span className="leading-none">D</span></span>
            </ButtonExtra>
          </ButtonGroup>
          <span className="font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted)]">
            defers: <span className="text-[var(--color-mm-fg)]">{defers}</span>
          </span>
        </div>
        <div className="flex items-center gap-(--spacing-mm-8)">
          <Button color="dark" onClick={() => { setPromotes(0); setDefers(0) }}>
            RESET
          </Button>
        </div>
      </div>
    )
  },
}

export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-mm-12) p-(--spacing-mm-12)">
      <div className="flex gap-(--spacing-mm-8) items-center">
        <Button color="blue">APPROVE</Button>
        <Button color="dark">CANCEL</Button>
        <Button color="dark" subType="dot">DECLINE</Button>
      </div>
      <div className="flex gap-(--spacing-mm-8) items-center">
        <ButtonGroup color="blue">
          <ButtonAction color="blue">PROMOTE</ButtonAction>
          <ButtonExtra color="blue">SPACE</ButtonExtra>
        </ButtonGroup>
        <ButtonGroup color="dark">
          <ButtonAction color="dark">DEFER</ButtonAction>
          <ButtonExtra color="dark"><span className="inline-flex items-center justify-center gap-[3px] leading-none"><span className="text-mm-sm leading-none translate-y-[0.5px]">⌘</span><span className="leading-none">D</span></span></ButtonExtra>
        </ButtonGroup>
      </div>
    </div>
  ),
}
