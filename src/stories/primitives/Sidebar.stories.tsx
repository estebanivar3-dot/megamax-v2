import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Home, Folder, Archive, Pin, DebugPlay } from "@nsmr/pixelart-react"
import { Sidebar, SidebarGroup } from "@/components/megamax/sidebar"
import { NavItem, NavSection } from "@/components/megamax/nav-item"
import { Badge } from "@/components/megamax/badge"

const meta: Meta<typeof Sidebar> = {
  title: "Primitives/Sidebar",
  component: Sidebar,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = {
  render: function Default() {
    const [active, setActive] = useState("home")
    return (
      <Sidebar>
        <SidebarGroup>
          <NavItem icon={<Home />} active={active === "home"} onClick={() => setActive("home")}>Home</NavItem>
          <NavItem icon={<Folder />} active={active === "files"} onClick={() => setActive("files")}>Files</NavItem>
          <NavItem icon={<Archive />} active={active === "archived"} onClick={() => setActive("archived")}>Archived</NavItem>
        </SidebarGroup>

        <SidebarGroup>
          <NavSection icon={<Pin />}>Pinned</NavSection>
          <NavItem variant="child" active={active === "auth"} onClick={() => setActive("auth")}>Auth</NavItem>
          <NavItem variant="child" active={active === "querybased"} onClick={() => setActive("querybased")}>Querybased</NavItem>
          <NavItem variant="child" badge={<Badge>1</Badge>} active={active === "postgres"} onClick={() => setActive("postgres")}>Postgres</NavItem>
          <NavItem variant="child" active={active === "chatwise"} onClick={() => setActive("chatwise")}>Chatwise</NavItem>
        </SidebarGroup>

        <SidebarGroup>
          <NavSection icon={<DebugPlay />}>Processes</NavSection>
          <NavItem variant="child" active={active === "playground"} onClick={() => setActive("playground")}>Playground</NavItem>
          <NavItem variant="child" badge={<Badge>4</Badge>} active={active === "library"} onClick={() => setActive("library")}>Library</NavItem>
          <NavItem variant="child" active={active === "log"} onClick={() => setActive("log")}>Log</NavItem>
          <NavItem variant="child" active={active === "storage"} onClick={() => setActive("storage")}>Storage</NavItem>
        </SidebarGroup>
      </Sidebar>
    )
  },
}
