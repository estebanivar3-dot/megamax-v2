import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * ToggleButton — Vol. 2 Brutalist (183:12314)
 *
 * Bare text segment used in toggle groups (Tasks / Scalers / Anthrax) AND
 * binary toggles (BLOOM ON/OFF, ORIGINAL/DUOTONE).
 *
 * NO border. NO uppercase. NO bold. Plain mono 10px. Selected state simply
 * gets a `#262626` bg fill and white text; unselected is transparent with
 * muted text.
 */

type ToggleButtonProps = React.ComponentProps<"button"> & {
  active?: boolean
}

function ToggleButton({
  className,
  active = false,
  children,
  ...props
}: ToggleButtonProps) {
  return (
    <button
      type="button"
      data-slot="toggle-button"
      data-active={active}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center justify-center shrink-0",
        "px-(--spacing-mm-8) py-(--spacing-mm-6)",
        "font-mono font-normal text-mm-tiny leading-(--leading-mm-normal) whitespace-nowrap",
        "cursor-pointer transition-colors",
        "outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mm-brand)]",
        active
          ? "bg-[var(--color-mm-tab-list-bg)] text-[var(--color-mm-fg)]"
          : "bg-transparent text-[var(--color-mm-muted)] hover:text-[var(--color-mm-fg)]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export { ToggleButton, type ToggleButtonProps }
