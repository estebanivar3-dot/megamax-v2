import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * NavItem + NavSection — Vol. 2 Brutalist sidebar atoms (228:1811)
 *
 * Three row shapes from Figma:
 *  - NavItem default — icon (8px) + label + optional badge. Used for top-level
 *    nav (HOME, FILES, ARCHIVED).
 *  - NavItem child   — label + optional badge, no icon. Used for items under
 *    a NavSection (AUTH, QUERYBASED, POSTGRES, ...).
 *  - NavSection      — cyan icon + cyan label + trailing 1px cyan line.
 *
 * `active` is bright: `bg-white/40` + on-brand (dark) text. NOT cyan — that's
 * the section/separator color, not the active-item color.
 *
 * Row metrics from Figma: `pl-[8px] pr-[4px] py-[4px] gap-[4px]`, icons 8px,
 * font 8px tracking-[1.08px] uppercase.
 */

const navItemVariants = cva(
  "mm-pixel-icon group relative flex items-center w-full gap-(--spacing-mm-4) " +
  "pl-(--spacing-mm-8) pr-(--spacing-mm-4) py-(--spacing-mm-4) " +
  "font-mono font-normal text-mm-nano leading-none tracking-mm-label uppercase " +
  "cursor-pointer transition-colors " +
  "outline-none focus-visible:outline-1 focus-visible:outline-offset-[-1px] focus-visible:outline-[var(--color-mm-brand)] " +
  "[&_>_svg]:size-(--size-mm-icon-xs) [&_>_svg]:shrink-0",
  {
    variants: {
      active: {
        true:  "bg-[var(--color-mm-fg-bright)] text-[var(--color-mm-on-brand)] [&_>_svg]:text-[var(--color-mm-on-brand)]",
        false: "text-[var(--color-mm-muted)] hover:text-[var(--color-mm-fg)] hover:bg-[var(--color-mm-surface)]",
      },
    },
    defaultVariants: { active: false },
  },
)

interface NavItemProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof navItemVariants> {
  /** `child` skips the icon slot — used under a `NavSection`. */
  variant?: "item" | "child"
  icon?: React.ReactNode
  badge?: React.ReactNode
}

function NavItem({
  className,
  active,
  variant = "item",
  icon,
  badge,
  children,
  ...props
}: NavItemProps) {
  return (
    <button
      type="button"
      data-slot="nav-item"
      data-variant={variant}
      data-active={active}
      className={cn(navItemVariants({ active }), className)}
      {...props}
    >
      {variant === "item" && icon}
      <span className="flex-1 text-left truncate">{children}</span>
      {badge}
    </button>
  )
}

function NavSection({
  className,
  children,
  icon,
  ...props
}: React.ComponentProps<"div"> & { icon?: React.ReactNode }) {
  return (
    <div
      data-slot="nav-section"
      className={cn(
        "mm-pixel-icon flex items-center gap-(--spacing-mm-4) w-full pl-(--spacing-mm-8)",
        "font-mono font-normal text-mm-nano leading-none tracking-mm-label uppercase text-[var(--color-mm-cyan)]",
        "[&_>_svg]:size-(--size-mm-icon-xs) [&_>_svg]:shrink-0",
        className,
      )}
      {...props}
    >
      {icon}
      <span className="shrink-0">{children}</span>
      <span aria-hidden className="flex-1 h-px bg-[var(--color-mm-cyan)]" />
    </div>
  )
}

export { NavItem, NavSection, navItemVariants, type NavItemProps }
