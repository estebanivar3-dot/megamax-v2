"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Toggle as TogglePrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

/**
 * ToggleButton — Vol. 2 Brutalist
 *
 * Radix Toggle ported with mm-* tokens. Pressable button that highlights
 * when on (data-state=on / aria-pressed=true). Distinct from the
 * switch-style `Toggle` in megamax/toggle.tsx — that one is a slider.
 *
 * Use for bold/italic/grid/list-style mutually-non-exclusive selections
 * (or wrap with Radix ToggleGroup for radio-style behavior).
 */

const toggleVariants = cva(
  "group/toggle inline-flex items-center justify-center gap-(--spacing-mm-4) " +
  "font-mono font-medium uppercase tracking-mm-label whitespace-nowrap " +
  "text-[var(--color-mm-muted)] cursor-pointer transition-colors outline-none " +
  "hover:bg-[var(--color-mm-surface)] hover:text-[var(--color-mm-fg)] " +
  "focus-visible:ring-2 focus-visible:ring-[var(--color-mm-brand)]/40 " +
  "disabled:pointer-events-none disabled:opacity-50 " +
  "data-[state=on]:bg-[var(--color-mm-surface)] data-[state=on]:text-[var(--color-mm-fg)] " +
  "aria-pressed:bg-[var(--color-mm-surface)] aria-pressed:text-[var(--color-mm-fg)] " +
  "aria-invalid:border-[var(--color-mm-pink)] aria-invalid:ring-2 aria-invalid:ring-[var(--color-mm-pink)]/30 " +
  "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-[var(--color-mm-border)] bg-transparent hover:bg-[var(--color-mm-surface)]",
      },
      size: {
        sm: "h-7 min-w-7 px-(--spacing-mm-6) text-mm-nano",
        md: "h-8 min-w-8 px-(--spacing-mm-8) text-mm-tiny",
        lg: "h-9 min-w-9 px-(--spacing-mm-12) text-mm-tiny",
        // icon variants — square, no horizontal padding, icon sized to box
        iconSm: "size-7 p-0 [&_svg]:size-[14px]",
        icon:   "size-8 p-0 [&_svg]:size-[16px]",
        iconLg: "size-9 p-0 [&_svg]:size-[18px]",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  },
)

function ToggleButton({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle-button"
      className={cn(toggleVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { ToggleButton, toggleVariants }
