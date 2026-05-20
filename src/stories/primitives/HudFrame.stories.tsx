import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import {
  HudFrame,
  HudFrameHeader,
  HudFrameHeaderStrip,
  HudFramePanel,
  HudFrameTitle,
  HudFrameBody,
} from "@/components/megamax/hud-frame"
import { Button } from "@/components/megamax/button"

const meta: Meta<typeof HudFrame> = {
  title: "Primitives/HudFrame",
  component: HudFrame,
  parameters: { layout: "centered" },
  argTypes: {
    mode: { control: "select", options: ["solo", "split"] },
  },
}

export default meta
type Story = StoryObj<typeof HudFrame>

export const Solo: Story = {
  args: { mode: "solo" },
  render: (args) => (
    <div style={{ width: 360 }}>
      <HudFrame {...args}>
        <HudFrameHeader>
          <HudFrameTitle>SOLO MODE</HudFrameTitle>
          <span className="font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted-soft)]">
            corner brackets
          </span>
        </HudFrameHeader>
        <HudFrameBody>
          <p className="font-mono text-mm-tiny text-[var(--color-mm-muted)] leading-[1.5]">
            Single panel with 4 cyan corner brackets. Default padding 12px, gap 16px between children.
          </p>
        </HudFrameBody>
      </HudFrame>
    </div>
  ),
}

/**
 * Interactive — toggle between solo and split modes at runtime to compare
 * corner-bracket vs divided-header layouts on identical content.
 */
export const Interactive: Story = {
  render: function Interactive() {
    const [mode, setMode] = useState<"solo" | "split">("solo")
    const isSplit = mode === "split"
    return (
      <div style={{ width: 360 }} className="flex flex-col gap-(--spacing-mm-12)">
        <Button color="dark" onClick={() => setMode(isSplit ? "solo" : "split")}>
          MODE: {mode.toUpperCase()} — CLICK TO TOGGLE
        </Button>
        <HudFrame mode={mode}>
          {isSplit ? (
            <>
              <HudFrameHeaderStrip>
                <HudFrameHeader>
                  <HudFrameTitle>OPERATOR CONSOLE</HudFrameTitle>
                  <span className="font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted-soft)]">
                    split
                  </span>
                </HudFrameHeader>
              </HudFrameHeaderStrip>
              <HudFramePanel>
                <p className="font-mono text-mm-tiny text-[var(--color-mm-muted)] leading-[1.5]">
                  Same content, divided header strip — no corner brackets.
                </p>
              </HudFramePanel>
            </>
          ) : (
            <>
              <HudFrameHeader>
                <HudFrameTitle>OPERATOR CONSOLE</HudFrameTitle>
                <span className="font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted-soft)]">
                  solo
                </span>
              </HudFrameHeader>
              <HudFrameBody>
                <p className="font-mono text-mm-tiny text-[var(--color-mm-muted)] leading-[1.5]">
                  Same content, 4 cyan corner brackets.
                </p>
              </HudFrameBody>
            </>
          )}
        </HudFrame>
      </div>
    )
  },
}

export const Split: Story = {
  args: { mode: "split" },
  render: (args) => (
    <div style={{ width: 360 }}>
      <HudFrame {...args}>
        <HudFrameHeaderStrip>
          <HudFrameHeader>
            <HudFrameTitle>SPLIT MODE</HudFrameTitle>
            <span className="font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted-soft)]">
              divided
            </span>
          </HudFrameHeader>
        </HudFrameHeaderStrip>
        <HudFramePanel>
          <p className="font-mono text-mm-tiny text-[var(--color-mm-muted)] leading-[1.5]">
            Header strip with bottom border, then body panel below. No corner brackets.
          </p>
        </HudFramePanel>
      </HudFrame>
    </div>
  ),
}
