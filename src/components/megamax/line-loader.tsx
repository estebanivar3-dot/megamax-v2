
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * LineLoader — Vol. 2 Brutalist
 *
 * Chunky uniform-height segmented loader (the "v1 CPU LOAD" pattern).
 * Used on the Memory 247 card. Same on/off color scheme as `ProgressBar`
 * but cells are all the same height — no VU-meter step-down tail.
 */

type LineLoaderColor = "cyan" | "green" | "amber" | "pink"

const colorMap: Record<LineLoaderColor, string> = {
  cyan:  "bg-[var(--color-mm-cyan)]",
  green: "bg-[var(--color-mm-green)]",
  amber: "bg-[var(--color-mm-amber)]",
  pink:  "bg-[var(--color-mm-pink)]",
}

interface LineLoaderProps extends Omit<React.ComponentProps<"div">, "color"> {
  /** 0–100. */
  value: number
  /** Total number of cells. Default 14 for the chunky look. */
  cells?: number
  color?: LineLoaderColor
  /** Horizontal gap between cells. Default 1px. */
  gap?: number
  /** Cell height. Default 4px. */
  height?: number
}

function LineLoader({
  value,
  cells = 14,
  color = "cyan",
  gap = 1,
  height = 4,
  className,
  style,
  ...props
}: LineLoaderProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const filledCount = Math.round((clamped / 100) * cells)
  const filledClass = colorMap[color]

  return (
    <div
      data-slot="line-loader"
      data-value={clamped}
      data-cells={cells}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn("flex items-stretch w-full", className)}
      style={{ gap, height, ...style }}
      {...props}
    >
      {Array.from({ length: cells }).map((_, i) => {
        const filled = i < filledCount
        return (
          <span
            key={i}
            data-slot="line-loader-cell"
            data-filled={filled}
            className={cn(
              "flex-1 min-w-px h-full",
              filled ? filledClass : "bg-[var(--color-mm-progress-tail)]",
            )}
          />
        )
      })}
    </div>
  )
}

export { LineLoader, type LineLoaderProps, type LineLoaderColor }
