import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * FieldRow — Vol. 2 Brutalist row layout
 *
 * The repeating `label (left) — control (right)` pattern from the WYRM
 * panels. Used 10+ times in the example (Levels, Text label, Container,
 * Preview scale, BLOOM, MUTED, COLOR MODE, ...).
 *
 * Not a component with logic — just the layout. Composes any control as
 * `children`. Use `ToggleRow` / `SliderRow` for the specialized versions
 * with built-in controls.
 */

type FieldRowProps = {
  label: React.ReactNode
  children: React.ReactNode
  /** Vertical alignment of label vs control. Defaults to `center`. */
  align?: "start" | "center"
  /** Width of the label column. Defaults to `auto` — pass a number for px. */
  labelWidth?: number
  className?: string
} & Omit<React.ComponentProps<"div">, "children">

function FieldRow({
  label,
  children,
  align = "center",
  labelWidth,
  className,
  ...props
}: FieldRowProps) {
  return (
    <div
      data-slot="field-row"
      className={cn(
        "flex justify-between gap-(--spacing-mm-12) w-full",
        align === "center" ? "items-center" : "items-start",
        className,
      )}
      {...props}
    >
      <div
        data-slot="field-row-label"
        className="font-mono text-mm-tiny tracking-mm-row uppercase text-[var(--color-mm-muted)] shrink-0"
        style={labelWidth ? { width: labelWidth } : undefined}
      >
        {label}
      </div>
      <div
        data-slot="field-row-control"
        className="flex items-center gap-(--spacing-mm-8) min-w-0"
      >
        {children}
      </div>
    </div>
  )
}

export { FieldRow, type FieldRowProps }
