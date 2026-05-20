import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * NumericValue — Vol. 2 Brutalist (183:12254, HudInput Value variant)
 *
 * Editable dark `#262626` cell that displays a number. Inherits native
 * `<input>` API (controlled via `value`+`onChange`, uncontrolled via
 * `defaultValue`, or locked with `readOnly`). Optional left `tick` is a 2px
 * muted-soft bar — reads as a tiny "cursor" affordance, not a status badge.
 *
 * Text: `--color-mm-muted` 10px mono, right-justified, tabular-nums. Used
 * next to slider rows (the bordered `[ 1.00 ]` cell).
 */

type NumericValueProps = {
  tick?: boolean
} & Omit<React.ComponentProps<"input">, "type">

function NumericValue({
  tick = true,
  className,
  ...inputProps
}: NumericValueProps) {
  return (
    <div
      data-slot="numeric-value"
      data-tick={tick}
      className={cn(
        "inline-flex items-center justify-end",
        "w-[112px] gap-(--spacing-mm-8) px-(--spacing-mm-6) py-(--spacing-mm-4)",
        "bg-[var(--color-mm-tab-list-bg)]",
        className,
      )}
    >
      {tick && (
        <span
          aria-hidden
          className="self-stretch w-(--spacing-mm-2) bg-[var(--color-mm-muted-soft)] shrink-0"
        />
      )}
      <input
        type="text"
        inputMode="decimal"
        size={1}
        className={cn(
          "min-w-0 flex-1 bg-transparent border-0 outline-none p-0",
          "font-mono text-mm-tiny leading-(--leading-mm-normal) tabular-nums text-right",
          "text-[var(--color-mm-muted)]",
          "focus:text-[var(--color-mm-fg)]",
          "read-only:cursor-default read-only:focus:text-[var(--color-mm-muted)]",
        )}
        {...inputProps}
      />
    </div>
  )
}

export { NumericValue, type NumericValueProps }
