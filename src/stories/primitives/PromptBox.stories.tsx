import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Cocktail, Lightbulb2, Attachment, ArrowBarUp } from "@nsmr/pixelart-react"
import { IconButton } from "@/components/megamax/icon-button"
import { Tab, TabList } from "@/components/megamax/tab"
import { PromptBox } from "@/components/megamax/prompt-box"

const meta: Meta<typeof PromptBox> = {
  title: "Primitives/PromptBox",
  component: PromptBox,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PromptBox>

export const Default: Story = {
  render: function Default() {
    const [active, setActive] = useState<"potion" | "idea">("potion")
    return (
      <PromptBox
        leading={
          <TabList>
            <Tab
              selected={active === "potion"}
              onClick={() => setActive("potion")}
              icon={<Cocktail />}
              aria-label="Potion"
            />
            <Tab
              selected={active === "idea"}
              onClick={() => setActive("idea")}
              icon={<Lightbulb2 />}
              aria-label="Idea"
            />
          </TabList>
        }
        trailing={
          <>
            <IconButton color="ghost" size="sm" aria-label="Attach"><Attachment /></IconButton>
            <IconButton color="blue" size="sm" aria-label="Submit"><ArrowBarUp /></IconButton>
          </>
        }
      />
    )
  },
}

export const Minimal: Story = {
  args: {
    placeholder: ">_TYPE A COMMAND...",
    trailing: <IconButton color="blue" size="sm" aria-label="Submit"><ArrowBarUp /></IconButton>,
  },
}

/**
 * Overflow — pre-filled with 5 lines of content to exercise auto-grow + the
 * brutalist ScrollArea takeover at line 4. Try editing to confirm both paths.
 */
export const Overflow: Story = {
  args: {
    defaultValue:
      "the tired developer goes to bed at dawn\n" +
      "having spent six hours fighting css overlays\n" +
      "and three more debating an icon's visual weight\n" +
      "tomorrow is another day of hud panels\n" +
      "but for now the cursor blinks alone",
    trailing: <IconButton color="blue" size="sm" aria-label="Submit"><ArrowBarUp /></IconButton>,
  },
}
