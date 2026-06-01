import type { Meta, StoryObj } from "@storybook/react-vite"
import { NumberChip } from "@/components/megamax/number-chip"
import { MenuList, MenuListItem } from "@/components/megamax/menu-list-item"
import { ToggleButton } from "@/components/megamax/toggle-button"

const meta: Meta<typeof NumberChip> = {
  title: "Primitives/NumberChip",
  component: NumberChip,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof NumberChip>

export const Default: Story = {
  args: { children: "4" },
}

/**
 * Widths — chip hugs single digits to a comfortable minimum, then grows
 * with content. Regression catch for any future padding/min-width tweak.
 */
export const Widths: Story = {
  render: () => (
    <div className="flex items-center gap-(--spacing-mm-8)">
      <NumberChip>1</NumberChip>
      <NumberChip>12</NumberChip>
      <NumberChip>999</NumberChip>
      <NumberChip>NEW</NumberChip>
    </div>
  ),
}

/**
 * In ToggleButton — satisfies Figma's `Show number` boolean via the
 * `trailing` slot.
 */
export const InToggleButton: Story = {
  render: () => (
    <ToggleButton active trailing={<NumberChip>4</NumberChip>}>
      LEVELS
    </ToggleButton>
  ),
}

/**
 * In MenuListItem — same chip drops into MenuListItem's existing `trailing`
 * slot for the count-badge pattern from Figma 228:1644.
 */
export const InMenuListItem: Story = {
  render: () => (
    <MenuList className="w-[200px]">
      <MenuListItem trailing={<NumberChip>12</NumberChip>}>INBOX</MenuListItem>
      <MenuListItem trailing={<NumberChip>3</NumberChip>}>STARRED</MenuListItem>
      <MenuListItem selected trailing={<NumberChip>128</NumberChip>}>ARCHIVE</MenuListItem>
    </MenuList>
  ),
}
