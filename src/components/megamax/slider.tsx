import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Slider — Vol. 2 Brutalist (211:694)
 *
 * 2px-tall horizontal track. Filled portion is solid `--color-mm-muted`
 * (#a1a1a1); unfilled is `--color-mm-tab-list-bg` (#262626) — high contrast,
 * the dark canvas color shows through. 12×12 square gray thumb (no rounding),
 * subtle drop shadow. Input element is 20px tall so the click hit zone is
 * comfortable; the visible track is painted on the runnable-track pseudo.
 *
 * Uncontrolled by default. Controlled via `value` + `onValueChange`.
 */

type SliderProps = Omit<React.ComponentProps<"input">, "type" | "onChange"> & {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number
  onValueChange?: (value: number) => void
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}

function Slider({
  className,
  style,
  value,
  defaultValue,
  min = 0,
  max = 100,
  step = 1,
  onValueChange,
  onChange,
  ...props
}: SliderProps) {
  const [internal, setInternal] = React.useState<number>(defaultValue ?? min)
  const current = value ?? internal

  const pct = max === min ? 0 : ((current - min) / (max - min)) * 100

  return (
    <input
      type="range"
      data-slot="slider"
      min={min}
      max={max}
      step={step}
      value={current}
      onChange={(e) => {
        const n = Number(e.target.value)
        if (value === undefined) setInternal(n)
        onValueChange?.(n)
        onChange?.(e)
      }}
      style={{
        ["--slider-pct" as string]: `${pct}%`,
        ...style,
      } as React.CSSProperties}
      className={cn(
        // The input is 20px tall (the interactive hit zone) but the visible
        // track painted on its pseudo-element runnable-track stays at 2px.
        // Wider zone makes the slider easy to click anywhere along its row.
        "block w-full h-[20px] appearance-none cursor-grab bg-transparent outline-none",
        "active:cursor-grabbing",
        // Runnable track — actual visible 2px bar with the fill gradient.
        "[&::-webkit-slider-runnable-track]:h-[2px] [&::-webkit-slider-runnable-track]:bg-[linear-gradient(to_right,var(--color-mm-muted)_0%,var(--color-mm-muted)_var(--slider-pct),var(--color-mm-tab-list-bg)_var(--slider-pct),var(--color-mm-tab-list-bg)_100%)]",
        "[&::-moz-range-track]:h-[2px] [&::-moz-range-track]:bg-[linear-gradient(to_right,var(--color-mm-muted)_0%,var(--color-mm-muted)_var(--slider-pct),var(--color-mm-tab-list-bg)_var(--slider-pct),var(--color-mm-tab-list-bg)_100%)]",
        // Thumb — 12×12 square, gray, centered on the 2px track via -mt: (12-2)/2 = 5px.
        "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-[12px] [&::-webkit-slider-thumb]:bg-[var(--color-mm-muted)] [&::-webkit-slider-thumb]:-mt-[5px] [&::-webkit-slider-thumb]:shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing",
        "[&::-moz-range-thumb]:size-[12px] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:rounded-none [&::-moz-range-thumb]:bg-[var(--color-mm-muted)] [&::-moz-range-thumb]:shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] [&::-moz-range-thumb]:cursor-grab",
        "focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-mm-brand)]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  )
}

export { Slider, type SliderProps }
