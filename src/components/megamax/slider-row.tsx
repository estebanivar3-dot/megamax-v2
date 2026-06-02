import * as React from "react"
import { Slider } from "./slider"
import { NumericValue } from "./numeric-value"
import { cn } from "@/lib/utils"

/**
 * SliderRow — Vol. 2 Brutalist (211:911)
 *
 * Two layouts:
 *  - `stacked` (default for inspector panels — Saturation/Hue/Opacity):
 *      Label (fg, regular) + value (muted, medium, tracking-1.2px) on top row,
 *      slider below. No NumericValue cell — value is plain inline text.
 *  - `inline` (for compact rows — Levels, Preview scale):
 *      Label + slider + NumericValue cell on a single row.
 */

type SliderRowProps = {
  label: React.ReactNode
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number) => void
  layout?: "inline" | "stacked"
  format?: (value: number) => React.ReactNode
  showValue?: boolean
  className?: string
}

function SliderRow({
  label,
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  layout = "stacked",
  format,
  showValue = true,
  className,
}: SliderRowProps) {
  const [internal, setInternal] = React.useState<number>(defaultValue ?? min)
  const current = value ?? internal

  const displayValue = format ? format(current) : current
  const handleChange = (n: number) => {
    if (value === undefined) setInternal(n)
    onValueChange?.(n)
  }

  if (layout === "stacked") {
    return (
      <div
        data-slot="slider-row"
        data-layout="stacked"
        className={cn("flex flex-col gap-(--spacing-mm-12) w-full", className)}
      >
        <div className="flex items-center justify-between text-mm-nano leading-none uppercase">
          <span className="font-mono font-normal tracking-mm-label text-[var(--color-mm-fg)]">{label}</span>
          {showValue && (
            <span className="font-mono font-medium tracking-mm-title tabular-nums text-[var(--color-mm-muted)]">{displayValue}</span>
          )}
        </div>
        <Slider value={current} min={min} max={max} step={step} onValueChange={handleChange} />
      </div>
    )
  }

  return (
    <div
      data-slot="slider-row"
      data-layout="inline"
      className={cn("flex items-center gap-(--spacing-mm-12) w-full", className)}
    >
      <span className="font-mono text-mm-nano leading-none tracking-mm-label uppercase text-[var(--color-mm-fg)] shrink-0">{label}</span>
      <div className="flex-1 min-w-0">
        <Slider value={current} min={min} max={max} step={step} onValueChange={handleChange} />
      </div>
      {showValue && <NumericValue value={String(displayValue)} readOnly className="w-[72px]" />}
    </div>
  )
}

export { SliderRow, type SliderRowProps }
