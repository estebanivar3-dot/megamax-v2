import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"

import { TitleBar } from "@/components/megamax/title-bar"
import { SectionHeader } from "@/components/megamax/section-header"
import { DropdownPill } from "@/components/megamax/dropdown-pill"
import { SliderRow } from "@/components/megamax/slider-row"
import { ToggleRow } from "@/components/megamax/toggle-row"
import { Button } from "@/components/megamax/button"

/**
 * 09 · WYRM Inspector — composition example
 *
 * Right WYRM panel from the 249:900 mockup. Composes TitleBar +
 * SectionHeader + DropdownPill + SliderRow + ToggleRow + Button.
 */

const meta: Meta = {
  title: "Examples/09 · WYRM Inspector",
  parameters: { layout: "centered", magnify: false },
}

export default meta
type Story = StoryObj

function WyrmInspector() {
  const [opacity, setOpacity] = useState(28)
  const [hue, setHue] = useState(121)
  const [sat, setSat] = useState(0.9)
  const [colorMode, setColorMode] = useState("original")
  const [muted, setMuted] = useState("on")
  const [bloom, setBloom] = useState("off")

  return (
    <div className="w-[260px] bg-[var(--color-mm-bg)] border border-[var(--color-mm-border)]">
      <TitleBar title="WYRM" status="06:04:11 — LAST.FM" />
      <div className="flex flex-col gap-(--spacing-mm-16) p-(--spacing-mm-12)">
        <SectionHeader label="General" />
        <DropdownPill type="stroke" className="w-full">Halftone</DropdownPill>
        <SliderRow layout="stacked" label="Opacity" value={opacity} onValueChange={setOpacity} format={(n) => `${n}%`} />
        <SliderRow layout="stacked" label="Hue" value={hue} onValueChange={setHue} max={360} />
        <SliderRow layout="stacked" label="Saturation" value={sat} onValueChange={setSat} min={0} max={1} step={0.01} format={(n) => n.toFixed(2)} />

        <SectionHeader label="Effects" />
        <ToggleRow
          label="Color Mode"
          value={colorMode}
          onValueChange={setColorMode}
          options={[{ value: "original", label: "Original" }, { value: "duotone", label: "Duotone" }]}
        />
        <ToggleRow label="Muted" value={muted} onValueChange={setMuted} options={[{ value: "on", label: "On" }, { value: "off", label: "Off" }]} />
        <ToggleRow label="Bloom" value={bloom} onValueChange={setBloom} options={[{ value: "on", label: "On" }, { value: "off", label: "Off" }]} />
      </div>
      <div className="p-(--spacing-mm-8)">
        <Button color="blue" subType="dot" className="w-full">Promote to Wiki</Button>
      </div>
    </div>
  )
}

export const Default: Story = { render: () => <WyrmInspector /> }
