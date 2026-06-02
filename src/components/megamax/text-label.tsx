
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * TextLabel — Vol. 2 Brutalist
 *
 * Small kbd-style chip used for keyboard hints (⌘3, SPACE) and "EVERYTHING ABOVE" / "GAUGE IN SYSTEM TAB"
 * style annotations. Two render types:
 *   - "stroke" (default): muted bg + 1px border + tiny shadow.
 *   - "fill":             same bg, no border (used in dense rows).
 *
 * Sources: Component 40:1349 (Text Label set), Frame 7 (40:1531).
 */

const textLabelVariants = cva(
  "mm-pixel-icon inline-flex items-center justify-center gap-(--spacing-mm-2) " +
  "px-(--spacing-mm-6) py-(--spacing-mm-4) " +
  "font-mono font-normal text-mm-nano uppercase tracking-mm-label whitespace-nowrap " +
  "text-[var(--color-mm-muted)] [&_svg]:size-(--size-mm-icon-xs) [&_svg]:shrink-0",
  {
    variants: {
      type: {
        stroke: "bg-[var(--color-mm-surface)] border border-[var(--color-mm-border)] shadow-[var(--shadow-mm-label)]",
        fill:   "bg-[var(--color-mm-surface)]",
      },
      state: {
        default:  "",
        disabled: "opacity-50",
      },
    },
    defaultVariants: { type: "stroke", state: "default" },
  },
)

interface TextLabelProps extends React.ComponentProps<"span">, VariantProps<typeof textLabelVariants> {}

function TextLabel({ className, type, state, ...props }: TextLabelProps) {
  return (
    <span
      data-slot="text-label"
      data-type={type ?? "stroke"}
      data-state={state ?? "default"}
      className={cn(textLabelVariants({ type, state }), className)}
      {...props}
    />
  )
}

export { TextLabel, textLabelVariants, type TextLabelProps }
