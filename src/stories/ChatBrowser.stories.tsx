import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Home, Folder, Archive, Pin, DebugPlay, Clock, Movie, Image } from "@nsmr/pixelart-react"

import { TitleBar } from "@/components/megamax/title-bar"
import { Sidebar, SidebarGroup } from "@/components/megamax/sidebar"
import { NavItem, NavSection } from "@/components/megamax/nav-item"
import { HudInput } from "@/components/megamax/hud-input"
import { SegmentedProgressBar } from "@/components/megamax/segmented-progress-bar"
import { Button } from "@/components/megamax/button"

/**
 * 10 · Chat Browser — composition example
 *
 * `/USERS/ESTEBAN/CHAT` panel from the 249:900 mockup. Composes TitleBar +
 * Sidebar + HudInput + SegmentedProgressBar rows + Button.
 */

const meta: Meta = {
  title: "Examples/10 · Chat Browser",
  parameters: { layout: "centered", magnify: false },
}

export default meta
type Story = StoryObj

function CountBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center justify-center size-[10px] px-(--spacing-mm-4) py-(--spacing-mm-2) bg-[var(--color-mm-surface)] border border-[var(--color-mm-border)] font-mono font-medium text-[6px] leading-[20px] text-[var(--color-mm-fg)] uppercase">
      {children}
    </span>
  )
}

function ProgressRow({ icon, name, value, time }: { icon: React.ReactNode; name: string; value: number; time: string }) {
  return (
    <div className="flex flex-col gap-(--spacing-mm-6) w-full font-mono text-mm-nano leading-none tracking-mm-label uppercase text-[var(--color-mm-muted)]">
      {/* Top: leading icon + filename (flex-1, truncates) + trailing clock icon */}
      <div className="mm-pixel-icon flex items-center gap-(--spacing-mm-4) [&_svg]:size-[8px]">
        {icon}
        <span className="truncate flex-1 min-w-0 text-[var(--color-mm-muted)]">{name}</span>
        <Clock />
      </div>
      {/* Bottom: segmented bar (flex-1) + percentage on the right */}
      <div className="flex items-center justify-between gap-(--spacing-mm-8) w-full">
        <SegmentedProgressBar value={value} color="cyan" />
        <span className="font-medium tabular-nums shrink-0 text-[var(--color-mm-muted)]">{time}</span>
      </div>
    </div>
  )
}

function ChatBrowser() {
  const [active, setActive] = useState("home")

  return (
    <div className="w-[480px] bg-[var(--color-mm-bg)] border border-[var(--color-mm-border)]">
      <TitleBar title="/USERS/ESTEBAN/CHAT" status="SUPERFILE" />
      <div className="flex h-[340px]">
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
            <NavItem variant="child" badge={<CountBadge>1</CountBadge>} active={active === "postgres"} onClick={() => setActive("postgres")}>Postgres</NavItem>
            <NavItem variant="child" active={active === "chatwise"} onClick={() => setActive("chatwise")}>Chatwise</NavItem>
          </SidebarGroup>

          <SidebarGroup>
            <NavSection icon={<DebugPlay />}>Processes</NavSection>
            <NavItem variant="child" active={active === "playground"} onClick={() => setActive("playground")}>Playground</NavItem>
            <NavItem variant="child" badge={<CountBadge>4</CountBadge>} active={active === "library"} onClick={() => setActive("library")}>Library</NavItem>
            <NavItem variant="child" active={active === "log"} onClick={() => setActive("log")}>Log</NavItem>
            <NavItem variant="child" active={active === "storage"} onClick={() => setActive("storage")}>Storage</NavItem>
          </SidebarGroup>
        </Sidebar>

        <div className="flex-1 flex flex-col gap-(--spacing-mm-12) p-(--spacing-mm-12) min-w-0">
          <HudInput placeholder=">_ INGEST TWEET FROM HTTPS://X.COM/ ..." />

          <div className="flex flex-col gap-(--spacing-mm-12)">
            <div className="font-mono text-mm-nano leading-none tracking-mm-label uppercase text-[var(--color-mm-muted)]">Processes</div>
            <ProgressRow icon={<Movie />} name="Game.of.Thrones.S02E02" value={70} time="70%" />
            <ProgressRow icon={<Image />} name="Screenshot from 2024-05-17_20-09-1…" value={50} time="50%" />
          </div>

          <div className="mt-auto">
            <Button color="blue" subType="dot" className="w-full">Promote to Wiki</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Default: Story = { render: () => <ChatBrowser /> }
