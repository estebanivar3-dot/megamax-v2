import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * ProgressBar — Vol. 2 Brutalist (Figma 40:1577)
 *
 * 12px-tall horizontal bar: dark track + solid colored fill + 3×3 pixel
 * dither at the leading edge of the fill.
 *
 * Architecture (borrowed from `ScanProgressBar`): the dither is a CHILD of
 * the fill div, anchored at `right: -12px`. As the fill grows, the dither
 * rides along just past the fill's right edge. The container is
 * `overflow-hidden`, so at `value = 100` the dither is positioned 12px
 * outside the container and clipped away → a fully solid fill, no special
 * casing. At `value = 0` the fill has zero width, so the dither sits at
 * `x = -12px` → clipped away too. No conditional rendering anywhere.
 *
 *   [████████ FILL ████████][▣ DITHER ▣][─── empty track ───]
 *                                 ↑
 *                              X . X        X = fillColor
 *                              . X .        . = transparent (track shows through)
 *                              X . X
 */

type ProgressBarColor = "cyan" | "green" | "amber" | "pink"

const colorMap: Record<ProgressBarColor, string> = {
  cyan:  "bg-[var(--color-mm-cyan)]",
  green: "bg-[var(--color-mm-green)]",
  amber: "bg-[var(--color-mm-amber)]",
  pink:  "bg-[var(--color-mm-pink)]",
}

interface ProgressBarProps extends Omit<React.ComponentProps<"div">, "color"> {
  value: number
  color?: ProgressBarColor
}

function ProgressBar({
  value,
  color = "cyan",
  className,
  ...props
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const fillColor = colorMap[color]

  return (
    <div
      data-slot="progress-bar"
      data-value={clamped}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn(
        "relative w-full h-(--size-mm-bar) bg-[var(--color-mm-tab-list-bg)] overflow-hidden",
        className,
      )}
      {...props}
    >
      <div
        data-slot="progress-bar-fill"
        className={cn(
          "absolute top-0 left-0 h-full transition-[width] duration-150",
          fillColor,
        )}
        style={{ width: `${clamped}%` }}
      >
        <div
          data-slot="progress-bar-dither"
          aria-hidden
          className="absolute top-0 w-(--size-mm-bar) h-(--size-mm-bar) grid grid-cols-3 grid-rows-3"
          style={{ right: "calc(-1 * var(--size-mm-bar))" }}
        >
          <span className={fillColor} />
          <span />
          <span className={fillColor} />
          <span />
          <span className={fillColor} />
          <span />
          <span className={fillColor} />
          <span />
          <span className={fillColor} />
        </div>
      </div>
    </div>
  )
}

export { ProgressBar, type ProgressBarProps, type ProgressBarColor }
