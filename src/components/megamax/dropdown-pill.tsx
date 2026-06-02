import * as React from "react"
import { ChevronDown } from "@nsmr/pixelart-react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * DropdownPill — Vol. 2 Brutalist (40:2966)
 *
 * Bordered pill trigger (distinct from full `<DropdownMenu>`). Label + chevron.
 * Trigger surface only — wrap with `DropdownMenu` from `ui/` and use this
 * `asChild` for a real menu.
 *
 * Variants:
 *  - type (Figma) — stroke / fill / negative / ghost
 *  - size — sm (compact) / md (Figma default) / lg
 *
 * Each `size` scales both padding AND chevron together so the icon stays
 * proportional to the type at its native pixel-art multiples (8/12/16).
 */

const dropdownPillVariants = cva(
  "mm-pixel-icon inline-flex items-center justify-center shrink-0 " +
  "gap-(--spacing-mm-4) " +
  "font-mono font-normal leading-none tracking-mm-label uppercase whitespace-nowrap " +
  "cursor-pointer transition-colors " +
  "outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mm-brand)] " +
  "[&_svg]:shrink-0 [&_svg]:[shape-rendering:crispEdges]",
  {
    variants: {
      type: {
        stroke:   "bg-[var(--color-mm-bg)] border border-[var(--color-mm-border)] text-[var(--color-mm-fg)] hover:border-[var(--color-mm-muted)]",
        fill:     "bg-[var(--color-mm-surface)] text-[var(--color-mm-fg)] hover:bg-[var(--color-mm-surface-hover)]",
        negative: "bg-[var(--color-mm-fg-bright)] shadow-[var(--shadow-mm-label)] text-[var(--color-mm-on-brand)] hover:bg-[var(--color-mm-fg-bright-hover)]",
        ghost:    "bg-transparent text-[var(--color-mm-muted)] hover:text-[var(--color-mm-fg)] hover:bg-[var(--color-mm-surface)]",
      },
      size: {
        sm: "px-(--spacing-mm-4) py-(--spacing-mm-2) text-mm-nano [&_svg]:size-(--size-mm-icon-xs)",
        md: "px-(--spacing-mm-6) py-(--spacing-mm-4) text-mm-nano [&_svg]:size-(--size-mm-icon-sm)",
        lg: "px-(--spacing-mm-8) py-(--spacing-mm-6) text-mm-tiny [&_svg]:size-(--size-mm-icon-md)",
      },
    },
    defaultVariants: { type: "stroke", size: "md" },
  },
)

interface DropdownPillProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof dropdownPillVariants> {
  trailingIcon?: React.ReactNode
}

function DropdownPill({
  className,
  type,
  size,
  children,
  trailingIcon,
  ...props
}: DropdownPillProps) {
  return (
    <button
      type="button"
      data-slot="dropdown-pill"
      data-type={type ?? "stroke"}
      data-size={size ?? "md"}
      className={cn(dropdownPillVariants({ type, size }), className)}
      {...props}
    >
      <span className="flex-1 text-left">{children}</span>
      {trailingIcon ?? <ChevronDown />}
    </button>
  )
}

export { DropdownPill, dropdownPillVariants, type DropdownPillProps }
