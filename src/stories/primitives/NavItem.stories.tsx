import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Home, Folder, Archive, Pin, DebugPlay } from "@nsmr/pixelart-react"
import { NavItem, NavSection } from "@/components/megamax/nav-item"
import { NumberChip } from "@/components/megamax/number-chip"

const meta: Meta<typeof NavItem> = {
  title: "Primitives/NavItem",
  component: NavItem,
  parameters: { layout: "centered" },
  argTypes: {
    active: { control: "boolean" },
    variant: { control: "radio", options: ["item", "child"] },
  },
}

export default meta
type Story = StoryObj<typeof NavItem>

export const Default: Story = {
  args: { icon: <Home />, children: "Home", variant: "item" },
}

export const Active: Story = {
  args: { icon: <Home />, children: "Home", variant: "item", active: true },
}

export const Child: Story = {
  args: { children: "Postgres", variant: "child" },
}

export const ChildWithBadge: Story = {
  args: { children: "Postgres", variant: "child", badge: <NumberChip>1</NumberChip> },
}

export const Section: Story = {
  name: "NavSection",
  render: () => (
    <div className="w-[200px]">
      <NavSection icon={<Pin />}>Pinned</NavSection>
    </div>
  ),
}

export const FullColumn: Story = {
  name: "Full column · interactive",
  render: function FullColumn() {
    const [active, setActive] = useState("home")
    const set = (id: string) => () => setActive(id)
    return (
      <div className="w-[200px] flex flex-col gap-(--spacing-mm-12) p-(--spacing-mm-8) bg-[var(--color-mm-bg)] border border-[var(--color-mm-border)]">
        <div className="flex flex-col gap-(--spacing-mm-4)">
          <NavItem icon={<Home />}    active={active === "home"}     onClick={set("home")}>Home</NavItem>
          <NavItem icon={<Folder />}  active={active === "files"}    onClick={set("files")}>Files</NavItem>
          <NavItem icon={<Archive />} active={active === "archived"} onClick={set("archived")}>Archived</NavItem>
        </div>

        <div className="flex flex-col gap-(--spacing-mm-4)">
          <NavSection icon={<Pin />}>Pinned</NavSection>
          <NavItem variant="child" active={active === "auth"}     onClick={set("auth")}>Auth</NavItem>
          <NavItem variant="child" active={active === "postgres"} onClick={set("postgres")} badge={<NumberChip>1</NumberChip>}>Postgres</NavItem>
          <NavItem variant="child" active={active === "chatwise"} onClick={set("chatwise")}>Chatwise</NavItem>
        </div>

        <div className="flex flex-col gap-(--spacing-mm-4)">
          <NavSection icon={<DebugPlay />}>Processes</NavSection>
          <NavItem variant="child" active={active === "playground"} onClick={set("playground")}>Playground</NavItem>
          <NavItem variant="child" active={active === "library"}    onClick={set("library")}    badge={<NumberChip>4</NumberChip>}>Library</NavItem>
          <NavItem variant="child" active={active === "log"}        onClick={set("log")}>Log</NavItem>
        </div>
      </div>
    )
  },
}
