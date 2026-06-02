import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState, type ReactNode } from "react"
import { User, Card, Edit, Trash, Keyboard, Logout, ChevronRight, UserPlus, Mail, Message } from "@nsmr/pixelart-react"
import {
  MenuListItem,
  MenuList,
  MenuListSeparator,
} from "@/components/megamax/menu-list-item"
import { DropdownPill } from "@/components/megamax/dropdown-pill"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

/** Cyan square indicator — matches the v2 selected-state vocabulary used by
 *  DropdownMenu CheckboxItem / RadioItem. Never a checkmark. Sized smaller
 *  than the global `--size-mm-dot` token because menu rows are denser than
 *  status rows. */
const SelectedMark = () => (
  <span className="block size-[6px] bg-[var(--color-mm-cyan)] shrink-0" aria-hidden />
)

/** Inline keyboard-shortcut text for menu trailing slots — fg-colored mono
 *  nano, matching the ShortcutHints key style. (Replaces the removed `Kbd`
 *  primitive; it was just this styled span.) */
const Shortcut = ({ children }: { children: ReactNode }) => (
  <span className="font-mono font-normal text-mm-nano leading-none tracking-mm-label uppercase text-[var(--color-mm-fg)]">
    {children}
  </span>
)

const meta: Meta<typeof MenuListItem> = {
  title: "Primitives/MenuListItem",
  component: MenuListItem,
  parameters: { layout: "centered" },
  argTypes: {
    variant: { control: "select", options: ["default", "label"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    selected: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div className="w-[220px]">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof MenuListItem>

export const Default: Story = { args: { children: "Compact" } }
export const Selected: Story = { args: { children: "Comfortable", selected: true, trailing: <SelectedMark /> } }
export const Disabled: Story = { args: { children: "Spacious", disabled: true } }
export const WithIcon: Story = { args: { children: "Profile", icon: <User /> } }
export const Command: Story = {
  args: { children: "Profile", icon: <User />, trailing: <Shortcut>⌘ P</Shortcut> },
}

export const Label: Story = {
  args: { variant: "label", children: "My Account" },
}

export const Destructive: Story = {
  args: { variant: "destructive", icon: <Trash />, children: "Delete", trailing: <Shortcut>⌘ ⌫</Shortcut> },
}

export const Drilldown: Story = {
  name: "Drilldown · chevron-right affordance",
  args: {
    icon: <UserPlus />,
    children: "Invite users",
    trailing: <ChevronRight className="shrink-0" />,
  },
}

export const DrilldownStack: Story = {
  name: "Drilldown · in a list",
  render: () => (
    <MenuList>
      <MenuListItem icon={<User />}>Profile</MenuListItem>
      <MenuListItem icon={<UserPlus />} trailing={<ChevronRight className="shrink-0" />}>
        Invite users
      </MenuListItem>
      <MenuListItem icon={<Mail />} trailing={<ChevronRight className="shrink-0" />}>
        Notifications
      </MenuListItem>
      <MenuListItem icon={<Message />} trailing={<ChevronRight className="shrink-0" />}>
        Connected apps
      </MenuListItem>
    </MenuList>
  ),
}

export const Overflow: Story = {
  name: "Overflow · scrollable list",
  render: () => (
    <MenuList maxHeight={180}>
      <MenuListItem variant="label">Filters</MenuListItem>
      <MenuListSeparator />
      {Array.from({ length: 20 }, (_, i) => (
        <MenuListItem key={i}>Filter Option {String(i + 1).padStart(2, "0")}</MenuListItem>
      ))}
    </MenuList>
  ),
}

export const Sizes: Story = {
  name: "Sizes · sm (default) / md / lg",
  render: () => (
    <div className="flex flex-col gap-(--spacing-mm-16)">
      <MenuList><MenuListItem size="sm">Compact</MenuListItem></MenuList>
      <MenuList><MenuListItem size="md">Comfortable</MenuListItem></MenuList>
      <MenuList><MenuListItem size="lg">Spacious</MenuListItem></MenuList>
    </div>
  ),
}

export const Stack: Story = {
  name: "Stack · static list",
  render: () => (
    <MenuList>
      <MenuListItem>Compact</MenuListItem>
      <MenuListItem selected trailing={<SelectedMark />}>Comfortable</MenuListItem>
      <MenuListItem>Spacious</MenuListItem>
    </MenuList>
  ),
}

export const CommandList: Story = {
  name: "Command · with icon + shortcut",
  render: () => (
    <MenuList>
      <MenuListItem variant="label">My Account</MenuListItem>
      <MenuListSeparator />
      <MenuListItem icon={<User />} trailing={<Shortcut>⇧ P</Shortcut>}>Profile</MenuListItem>
      <MenuListItem icon={<Card />} trailing={<Shortcut>⌘ B</Shortcut>}>Billing</MenuListItem>
      <MenuListItem icon={<Edit />} trailing={<Shortcut>⌘ E</Shortcut>}>Edit</MenuListItem>
      <MenuListItem icon={<Keyboard />} trailing={<Shortcut>⌘ K</Shortcut>}>Shortcuts</MenuListItem>
      <MenuListSeparator />
      <MenuListItem icon={<Trash />} disabled trailing={<Shortcut>⌘ ⌫</Shortcut>}>Delete</MenuListItem>
      <MenuListItem icon={<Logout />} trailing={<Shortcut>⌘ Q</Shortcut>}>Log out</MenuListItem>
    </MenuList>
  ),
}

const DENSITIES = ["Compact", "Comfortable", "Spacious"] as const

export const Interactive: Story = {
  name: "Interactive · single-select",
  render: function Interactive() {
    const [value, setValue] = useState<typeof DENSITIES[number]>("Comfortable")
    return (
      <MenuList>
        {DENSITIES.map((d) => (
          <MenuListItem
            key={d}
            selected={value === d}
            trailing={value === d ? <SelectedMark /> : null}
            onClick={() => setValue(d)}
          >
            {d}
          </MenuListItem>
        ))}
      </MenuList>
    )
  },
}

export const InsideDropdown: Story = {
  name: "Inside DropdownPill · live menu",
  render: function InsideDropdown() {
    const [value, setValue] = useState<typeof DENSITIES[number]>("Comfortable")
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <DropdownPill type="stroke">{value}</DropdownPill>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="p-0 min-w-[180px] border-0">
          <MenuList>
            {DENSITIES.map((d) => (
              <MenuListItem
                key={d}
                selected={value === d}
                trailing={value === d ? <SelectedMark /> : null}
                onClick={() => setValue(d)}
              >
                {d}
              </MenuListItem>
            ))}
          </MenuList>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}
