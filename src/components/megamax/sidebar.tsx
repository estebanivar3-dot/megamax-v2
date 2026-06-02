import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Sidebar — Vol. 2 Brutalist (228:1811)
 *
 * Vertical rail. Composes `<NavItem>` and `<NavSection>` children grouped
 * into sections separated by `--spacing-mm-12`. Items inside a section are
 * spaced `--spacing-mm-4`. The component renders the outer gap; you compose
 * the inner groups yourself with a flex-col wrapper.
 *
 * Fixed `w-[168px]` rail (Figma), `--color-mm-bg` + right border. No left
 * padding — items carry their own `pl-(--spacing-mm-8)`.
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
