
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Toggle — Vol. 2 Brutalist (switch-style; square, no radius)
 *
 * Two sizes, both with crisp 1px borders and integer pixel padding so they
 * render sharp at any zoom level (no sub-pixel fuzz):
 *
 *   - "md" (default): ~34×18 container · 16×12 handle
 *   - "sm":           ~22×12 container · 10×6 handle
 *
 * Distinct from `ToggleButton` (shadcn-style pressable button in ui/toggle.tsx).
 * Stateful by default — pass `defaultOn` for uncontrolled, or `on` + `onChange`
 * for controlled.
 */

type ToggleSize = "sm" | "md"

const trackVariants = cva(
  "group relative inline-flex items-center justify-end cursor-pointer transition-colors " +
  "border border-solid border-[var(--color-mm-border)] " +
  "outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mm-brand)]",
  {
    variants: {
      size: { sm: "py-[1px]", md: "py-[2px]" },
      on:   { true: "", false: "" },
    },
    compoundVariants: [
      // padding: when "on" the handle is at the right; when "off" it's at the left.
      // Pixel-precise paddings keep the handle aligned at integer offsets so the
      // border doesn't develop sub-pixel fuzz at any zoom level.
      { size: "sm", on: true,  class: "pl-[9px] pr-[1px]" },
      { size: "sm", on: false, class: "pl-[1px] pr-[9px]" },
      { size: "md", on: true,  class: "pl-[14px] pr-[2px]" },
      { size: "md", on: false, class: "pl-[2px] pr-[14px]" },
      // track bg + inset
      { on: true,  class: "bg-[var(--color-mm-cyan)] hover:bg-[var(--color-mm-cyan-hover)]" },
      { on: false, class: "bg-[var(--color-mm-surface)] hover:bg-[var(--color-mm-surface-hover)] shadow-[var(--shadow-mm-track-inset)]" },
    ],
    defaultVariants: { size: "md", on: false },
  },
)

const handleVariants = cva(
  "block shrink-0 transition-colors",
  {
    variants: {
      size: {
        sm: "w-[10px] h-[8px]",
        md: "w-[16px] h-[12px]",
      },
      on: { true: "", false: "" },
    },
    compoundVariants: [
      // handle color
      { on: true,  class: "bg-[var(--color-mm-handle)]" },
      { on: false, class: "bg-[var(--color-mm-handle-soft)] group-hover:bg-[var(--color-mm-handle)]" },
      // handle shadow per (on × size) — token-driven so the rgbas live in index.css
      { on: true,  size: "sm", class: "shadow-[var(--shadow-mm-handle-on-sm)]" },
      { on: true,  size: "md", class: "shadow-[var(--shadow-mm-handle-on-md)]" },
      { on: false, size: "sm", class: "shadow-[var(--shadow-mm-handle-off-sm)]" },
      { on: false, size: "md", class: "shadow-[var(--shadow-mm-handle-off-md)]" },
    ],
    defaultVariants: { size: "md", on: false },
  },
)

interface ToggleProps
  extends Omit<React.ComponentProps<"button">, "onChange">,
    Pick<VariantProps<typeof trackVariants>, "size"> {
  on?: boolean
  defaultOn?: boolean
  onChange?: (next: boolean) => void
}

function Toggle({
  on: controlledOn,
  defaultOn = false,
  size = "md",
  onChange,
  className,
  ...props
}: ToggleProps) {
  const [uncontrolledOn, setUncontrolledOn] = React.useState(defaultOn)
  const isControlled = controlledOn !== undefined
  const on = isControlled ? !!controlledOn : uncontrolledOn

  function handleClick() {
    const next = !on
    if (!isControlled) setUncontrolledOn(next)
    onChange?.(next)
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      data-slot="toggle"
      data-on={on}
      data-size={size}
      onClick={handleClick}
      className={cn(trackVariants({ size, on }), className)}
      {...props}
    >
      <span aria-hidden className={handleVariants({ size, on })} />
    </button>
  )
}

export { Toggle, trackVariants, handleVariants, type ToggleProps, type ToggleSize }
