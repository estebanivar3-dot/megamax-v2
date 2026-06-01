import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * NumberChip — Vol. 2 Brutalist
 *
 * Tiny count/value chip styled like a selected Tab (recessed surface + 1px
 * border + label shadow). Used as the `trailing` slot for `ToggleButton`
 * and `MenuListItem` to satisfy Figma's "Show number" boolean pattern
 * without coupling those primitives to chip internals.
 *
 * Source: IconTab instance reused as a number chip in Figma ToggleButton
 *         (183:12314) + MenuListItem (228:1644).
 */

type NumberChipProps = React.ComponentProps<"span"> & {
  children: React.ReactNode
}

function NumberChip({ className, children, ...props }: NumberChipProps) {
  return (
    <span
      data-slot="number-chip"
      className={cn(
        "inline-flex items-center justify-center shrink-0",
        "font-mono font-medium text-mm-tiny leading-(--leading-mm-loose) uppercase tracking-mm-tab",
        "px-[0.5em] py-[0.1em] min-w-[1.75em]",
        "bg-[var(--color-mm-surface)] border border-[var(--color-mm-border)]",
        "shadow-[var(--shadow-mm-label)] text-[var(--color-mm-fg)]",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export { NumberChip, type NumberChipProps }
