import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Indicator — Vol. 2 Brutalist atom
 *
 * Tiny square pip used next to nav section headers, active states, and
 * status labels. 6px on mobile, 10px on desktop (via --size-mm-dot).
 *
 * Colors map to the v2 status palette. `live` adds a slow pulse for
 * "currently active" affordances.
 */

const indicatorVariants = cva(
  "inline-block shrink-0 size-(--size-mm-dot)",
  {
    variants: {
      tone: {
        cyan:   "bg-[var(--color-mm-cyan)]",
        brand:  "bg-[var(--color-mm-brand)]",
        green:  "bg-[var(--color-mm-green)]",
        amber:  "bg-[var(--color-mm-amber)]",
        pink:   "bg-[var(--color-mm-pink)]",
        purple: "bg-[var(--color-mm-purple)]",
        muted:  "bg-[var(--color-mm-muted)]",
      },
      live: {
        true:  "animate-[mm-pulse_1.4s_steps(2,end)_infinite]",
        false: "",
      },
    },
    defaultVariants: { tone: "cyan", live: false },
  },
)

interface IndicatorProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof indicatorVariants> {}

function Indicator({ className, tone, live, ...props }: IndicatorProps) {
  return (
    <span
      data-slot="indicator"
      data-tone={tone ?? "cyan"}
      aria-hidden
      className={cn(indicatorVariants({ tone, live }), className)}
      {...props}
    />
  )
}

export { Indicator, indicatorVariants, type IndicatorProps }
