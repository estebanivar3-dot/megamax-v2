import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * TabList + Tab — Vol. 2 Brutalist
 *
 * Three variants, auto-detected from props:
 *   - Icon only      → `<Tab icon={<Pencil />} aria-label="..." />`         (40×40 square)
 *   - Text only      → `<Tab>LABEL</Tab>`                                    (text-width)
 *   - Icon + text    → `<Tab icon={<Pencil />}>EDIT</Tab>`                   (icon + label row)
 *
 * Selected tab gets a recessed `--color-mm-surface` fill + 1px border +
 * subtle shadow (the "pressed in" look from Figma 210:510 / 39:955).
 *
 * Source: Aramaki Cadence card (39:652) → Tab List 39:955.
 *         IconTabList Figma 210:510, IconTab 183:11570 (now unified into Tab).
 */

function TabList({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="tab-list"
      role="tablist"
      className={cn(
        // p in em so chrome scales with contained tabs' text. 0.4em gives the
        // selected tab a visible breathing margin on all four sides instead of
        // crowding its border against the list edge. `w-max` keeps the strip
        // hugging its content width even inside a stretching flex parent —
        // otherwise tabs (which are shrink-0) overflow past the strip's bg.
        "inline-flex w-max items-center bg-[var(--color-mm-tab-list-bg)] p-[0.4em] text-mm-tiny",
        className,
      )}
      {...props}
    />
  )
}

type TabProps = React.ComponentProps<"button"> & {
  selected?: boolean
  /** Leading pixel-art icon. Pass alone for icon-only tab, or with `children` for icon + text. */
  icon?: React.ReactNode
}

function Tab({
  className,
  selected = false,
  icon,
  children,
  ...props
}: TabProps) {
  const iconOnly = icon != null && (children == null || children === false)
  const variant = iconOnly ? "icon" : icon != null ? "icon-text" : "text"

  return (
    <button
      type="button"
      role="tab"
      data-slot="tab"
      data-selected={selected}
      data-variant={variant}
      aria-pressed={selected}
      className={cn(
        "mm-pixel-icon",
        "inline-flex items-center justify-center cursor-pointer shrink-0",
        "font-mono font-medium text-mm-tiny leading-(--leading-mm-loose) uppercase",
        "tracking-mm-tab whitespace-nowrap text-[var(--color-mm-muted)]",
        "[&_svg]:shrink-0",
        // Variant sizing: icon-only is a square; text and icon-text size to content.
        variant === "icon" && "size-(--size-mm-button-md) p-0 [&_svg]:size-(--size-mm-icon-lg)",
        variant === "icon-text" && "px-[0.75em] py-[0.2em] gap-[0.5em] [&_svg]:size-[14px]",
        variant === "text" && "px-[1em] py-[0.2em]",
        selected
          ? "bg-[var(--color-mm-surface)] border border-[var(--color-mm-border)] shadow-[var(--shadow-mm-label)]"
          : "border border-transparent",
        "outline-none focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-[var(--color-mm-muted)]",
        className,
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}

export { TabList, Tab, type TabProps }
