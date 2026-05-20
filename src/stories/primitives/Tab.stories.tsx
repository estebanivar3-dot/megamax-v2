import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { PaintBucket, Mouse, Edit, EyeClosed, Eye } from "@nsmr/pixelart-react"
import { Tab, TabList } from "@/components/megamax/tab"

const meta: Meta = {
  title: "Primitives/Tab",
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: function Default() {
    const [active, setActive] = useState("intake")
    return (
      <TabList>
        {["intake", "system", "wiki", "parsed"].map((tab) => (
          <Tab
            key={tab}
            selected={active === tab}
            onClick={() => setActive(tab)}
          >
            {tab}
          </Tab>
        ))}
      </TabList>
    )
  },
}

/**
 * Interactive — tab content swaps below the list. Body fades in via a
 * key-based remount so each switch feels distinct.
 */
const tabBodies: Record<string, string> = {
  intake: "Captures from Kusanagi land here as raw markdown with intent: frontmatter.",
  system: "Aramaki batch runs, reports, heartbeats. 5 timers across 2 machines.",
  wiki:   "Promoted knowledge — the only tier nothing auto-writes to.",
  parsed: "Distilled exports: weekly synthesis, actionables, brain-state.",
}

export const Interactive: Story = {
  render: function Interactive() {
    const [active, setActive] = useState<keyof typeof tabBodies>("intake")
    return (
      <div className="flex flex-col items-start gap-(--spacing-mm-12) p-(--spacing-mm-12)" style={{ width: 480 }}>
        <TabList>
          {Object.keys(tabBodies).map((tab) => (
            <Tab
              key={tab}
              selected={active === tab}
              onClick={() => setActive(tab as keyof typeof tabBodies)}
            >
              {tab}
            </Tab>
          ))}
        </TabList>
        <p
          key={active}
          className="font-mono text-mm-tiny text-[var(--color-mm-muted)] leading-[1.5]"
          style={{ animation: "mm-tab-fade 200ms ease-out" }}
        >
          {tabBodies[active]}
        </p>
      </div>
    )
  },
}

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-mm-8) p-(--spacing-mm-12)">
      <TabList>
        <Tab selected>SELECTED</Tab>
        <Tab>IDLE</Tab>
        <Tab>IDLE</Tab>
      </TabList>
    </div>
  ),
}

/**
 * Icon-only — 32×32 square, no text. Use for tool/mode toolbars where
 * pictograms carry the meaning (PromptBox leading slot, panel chrome).
 */
export const IconOnly: Story = {
  name: "Icon · 32×32 square",
  render: function IconOnly() {
    const [active, setActive] = useState<"paint" | "select" | "edit">("paint")
    return (
      <TabList>
        <Tab
          selected={active === "paint"}
          onClick={() => setActive("paint")}
          icon={<PaintBucket />}
          aria-label="Paint tool"
        />
        <Tab
          selected={active === "select"}
          onClick={() => setActive("select")}
          icon={<Mouse />}
          aria-label="Select tool"
        />
        <Tab
          selected={active === "edit"}
          onClick={() => setActive("edit")}
          icon={<Edit />}
          aria-label="Edit tool"
        />
      </TabList>
    )
  },
}

/**
 * Icon + text — icon (14px) sits left of the label, joined by a thin gap.
 * Use when the icon reinforces the label rather than replacing it.
 */
export const IconText: Story = {
  name: "Icon + Text",
  render: function IconText() {
    const [active, setActive] = useState<"visible" | "hidden">("visible")
    return (
      <TabList>
        <Tab
          selected={active === "visible"}
          onClick={() => setActive("visible")}
          icon={<Eye />}
        >
          VISIBLE
        </Tab>
        <Tab
          selected={active === "hidden"}
          onClick={() => setActive("hidden")}
          icon={<EyeClosed />}
        >
          HIDDEN
        </Tab>
      </TabList>
    )
  },
}
