import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Sidebar — Vol. 2 Brutalist (228:1811)
 *
 * Vertical rail. Composes `<NavItem>` and `<NavSection>` children grouped
 * into sections separated by `gap-[12px]`. Items inside a section are
 * spaced `gap-[4px]`. The component renders the gap-12 outer; you compose
 * the inner gap-4 groups yourself with a flex-col wrapper.
 *
 * From Figma: `bg-bg`, `border-r border-white/10`, `pr-[8px] py-[8px]`. No
 * left padding — items have their own `pl-[8px]`.
 */

function Sidebar({
  className,
  children,
  ...props
}: React.ComponentProps<"nav">) {
  return (
    <nav
      data-slot="sidebar"
      className={cn(
        "flex flex-col gap-(--spacing-mm-12) w-[168px] py-(--spacing-mm-8) pr-(--spacing-mm-8)",
        "bg-[var(--color-mm-bg)] border-r border-[var(--color-mm-border)]",
        className,
      )}
      {...props}
    >
      {children}
    </nav>
  )
}

/** Item group within a Sidebar — `gap-[4px]` flex column. */
function SidebarGroup({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      className={cn("flex flex-col gap-(--spacing-mm-4) w-full", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { Sidebar, SidebarGroup }
