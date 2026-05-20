import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  HudFrame,
  HudFrameHeader,
  HudFrameTitle,
} from "@/components/megamax/hud-frame"
import { TabList, Tab } from "@/components/megamax/tab"
import { IndexRow, IndexRowSection } from "@/components/megamax/index-row"

const meta: Meta = {
  title: "Examples/01 · Aramaki Cadence",
  parameters: { layout: "centered", magnify: false },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div style={{ width: 592 }}>
      <HudFrame mode="solo">
        <div className="flex w-full flex-col items-start gap-(--spacing-mm-12)">
          <HudFrameHeader>
            <HudFrameTitle>ARAMAKI CADENCE</HudFrameTitle>
          </HudFrameHeader>
          <TabList>
            <Tab selected>INTAKE</Tab>
            <Tab>SYSTEM</Tab>
            <Tab>WIKI</Tab>
            <Tab>PARSED</Tab>
          </TabList>
        </div>

        <div className="w-full flex flex-col items-start gap-(--spacing-mm-8)">
          <IndexRowSection label="recent batch events" meta="LIVE" />
          <IndexRow
            id="01"
            markerColor="green"
            label="kb/raw/tweet/rookie-edge-polymarket.md"
            status={{ color: "green", label: "DONE" }}
            trailing="07h 12m"
          />
          <IndexRow
            id="01"
            markerColor="green"
            label="kb/raw/article/autonomous-signal-intel.md"
            status={{ color: "green", label: "DONE" }}
            trailing="07h 12m"
          />
        </div>

        <div className="w-full flex flex-col items-start gap-(--spacing-mm-8)">
          <IndexRowSection label="loading batch events" meta="STARTED" />
          <IndexRow
            id="01"
            markerColor="cyan"
            label="kb/raw/article/huggingface-tool-builder.md"
            status={{ color: "cyan", label: "PROCESSING" }}
            trailing="14:04:12 UTC"
          />
          <IndexRow
            id="01"
            markerColor="cyan"
            label="kb/raw/tiktok/turritopsis-dohrnii.md"
            status={{ color: "cyan", label: "PROCESSING" }}
            trailing="14:17:33 UTC"
          />
        </div>
      </HudFrame>
    </div>
  ),
}
