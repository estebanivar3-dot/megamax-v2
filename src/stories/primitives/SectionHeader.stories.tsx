import type { Meta, StoryObj } from "@storybook/react-vite"
import { SectionHeader } from "@/components/megamax/section-header"

const meta: Meta<typeof SectionHeader> = {
  title: "Primitives/SectionHeader",
  component: SectionHeader,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-[260px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SectionHeader>

export const Default: Story = { args: { label: "General" } }
export const Hidden: Story = { args: { label: "Effects", defaultVisible: false } }
export const Collapsed: Story = { args: { label: "Effects", defaultExpanded: false } }
export const LabelOnly: Story = {
  args: { label: "Section", showVisibilityToggle: false, showExpandToggle: false },
}

export const Stack: Story = {
  render: () => (
    <div className="flex flex-col gap-(--spacing-mm-12)">
      <SectionHeader label="General" />
      <SectionHeader label="Effects" />
      <SectionHeader label="Output" defaultVisible={false} />
    </div>
  ),
}
