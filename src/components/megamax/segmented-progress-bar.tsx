import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * SegmentedProgressBar — Vol. 2 Brutalist (Figma 216:911 / Processes panel)
 *
 * Horizontal row of small cells, each 6px wide × 12px tall, 1.5px gap.
 * Filled cells use the chosen color; empty cells show a 1px muted border on
 * transparent bg. The "VU-meter" / "8-bit progress" aesthetic — distinct
 * from `ProgressBar` (solid+dither) and `ScanProgressBar` (scanning fill).
 *
 *   [█][█][█][█][█][▢][▢][▢][▢][▢]    (5/10 = 50%)
 *
 * Defaults to 27 cells (matches Figma). For shorter or wider rows pass
 * `cells` to customize density.
 */

type SegmentedProgressBarColor = "cyan" | "green" | "amber" | "pink"

const colorMap: Record<SegmentedProgressBarColor, string> = {
  cyan:  "bg-[var(--color-mm-cyan)]",
  green: "bg-[var(--color-mm-green)]",
  amber: "bg-[var(--color-mm-amber)]",
  pink:  "bg-[var(--color-mm-pink)]",
}

interface SegmentedProgressBarProps extends Omit<React.ComponentProps<"div">, "color"> {
  /** 0–100. Rounded to nearest filled cell count. */
  value: number
  /** Total cells in the row. Default 27 (matches Figma 216:911). */
  cells?: number
  color?: SegmentedProgressBarColor
}

function SegmentedProgressBar({
  value,
  cells = 27,
  color = "cyan",
  className,
  ...props
}: SegmentedProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const filledCount = Math.round((clamped / 100) * cells)
  const filledClass = colorMap[color]

  return (
    <div
      data-slot="segmented-progress-bar"
      data-value={clamped}
      data-cells={cells}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("inline-flex items-end gap-(--spacing-mm-2)", className)}
      {...props}
    >
      {Array.from({ length: cells }).map((_, i) => {
        const filled = i < filledCount
        return (
          <span
            key={i}
            data-slot="segmented-progress-bar-cell"
            data-filled={filled}
            className={cn(
              "w-(--size-mm-dot) h-(--size-mm-bar) shrink-0",
              filled
                ? filledClass
                : "border border-[var(--color-mm-border)]",
            )}
          />
        )
      })}
    </div>
  )
}

export { SegmentedProgressBar, type SegmentedProgressBarProps, type SegmentedProgressBarColor }
