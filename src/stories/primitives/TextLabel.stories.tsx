import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Command, Check, Keyboard, Close } from "@nsmr/pixelart-react"
import { TextLabel } from "@/components/megamax/text-label"

const meta: Meta<typeof TextLabel> = {
  title: "Primitives/TextLabel",
  component: TextLabel,
  parameters: { layout: "centered" },
  argTypes: {
    type:  { control: "select", options: ["stroke", "fill"] },
    state: { control: "select", options: ["default", "disabled"] },
  },
}

export default meta
type Story = StoryObj<typeof TextLabel>

export const Stroke: Story = {
  args: { type: "stroke", children: "⌘K" },
}

export const Fill: Story = {
  args: { type: "fill", children: "GAUGE IN SYSTEM TAB" },
}

export const Disabled: Story = {
  args: { type: "stroke", state: "disabled", children: "READ ONLY" },
}

/**
 * Interactive — click any chip to copy its content. The chip flips to
 * `COPIED ✓` for 1s, then reverts. TextLabel is presentational; this shows
 * how it composes inside an interactive wrapper.
 */
function CopyLabel({
  copyText,
  type = "stroke",
  children,
}: {
  copyText: string
  type?: "stroke" | "fill"
  children: React.ReactNode
}) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(copyText)
        setCopied(true)
        setTimeout(() => setCopied(false), 1000)
      }}
      className="cursor-pointer outline-none"
    >
      <TextLabel type={type} className={copied ? "!text-[var(--color-mm-green)]" : ""}>
        {copied ? (
          <>
            <Check />
            COPIED
          </>
        ) : (
          children
        )}
      </TextLabel>
    </button>
  )
}

export const Interactive: Story = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-mm-12) p-(--spacing-mm-12)">
      <span className="font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted-soft)]">
        click any chip to copy
      </span>
      <div className="flex flex-wrap gap-(--spacing-mm-8) items-center">
        <CopyLabel copyText="⌘K"><Command />K</CopyLabel>
        <CopyLabel copyText="⌘1"><Command />1</CopyLabel>
        <CopyLabel copyText="SPACE"><Keyboard />SPACE</CopyLabel>
        <CopyLabel copyText="ESC"><Close />ESC</CopyLabel>
      </div>
      <div className="flex flex-wrap gap-(--spacing-mm-8) items-center">
        <CopyLabel type="fill" copyText="EVERYTHING ABOVE">EVERYTHING ABOVE</CopyLabel>
        <CopyLabel type="fill" copyText="GAUGE IN SYSTEM TAB">GAUGE IN SYSTEM TAB</CopyLabel>
      </div>
    </div>
  ),
}

export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-mm-12) p-(--spacing-mm-12)">
      <div className="flex gap-(--spacing-mm-8) items-center">
        <TextLabel type="stroke">⌘K</TextLabel>
        <TextLabel type="stroke">⌘1</TextLabel>
        <TextLabel type="stroke">SPACE</TextLabel>
        <TextLabel type="stroke">ESC</TextLabel>
      </div>
      <div className="flex gap-(--spacing-mm-8) items-center">
        <TextLabel type="fill">EVERYTHING ABOVE</TextLabel>
        <TextLabel type="fill">GAUGE IN SYSTEM TAB</TextLabel>
      </div>
      <div className="flex gap-(--spacing-mm-8) items-center">
        <TextLabel type="stroke" state="disabled">DISABLED</TextLabel>
        <TextLabel type="fill" state="disabled">LOCKED</TextLabel>
      </div>
    </div>
  ),
}
