import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * ScanProgressBar — Vol. 2 Brutalist (Figma 40:1577)
 *
 * 12px-tall horizontal bar matching the Figma "scan/progress" pattern:
 *   - Dark `#262626` track across the full width
 *   - Solid colored fill from left, sized by `value%`
 *   - 3×3 pixel dither at the leading edge of the fill (5 cells filled in
 *     a checkerboard, 4 cells transparent so the dark track shows through)
 *
 *      [████████ FILL ████████][▣ DITHER ▣][─── empty track ───]
 *                                    ↑
 *                                 X . X        X = fillColor
 *                                 . X .        . = transparent (track shows)
 *                                 X . X
 *
 * Architecture: the dither is a CHILD of the fill div, anchored at
 * `right: -12px`. As the fill grows, the dither rides along just past the
 * fill's right edge. The container is `overflow-hidden`, so at `value = 100`
 * the dither is positioned 12px outside the container and clipped → fully
 * solid fill with no special casing. At `value = 0` the fill has zero width
 * so the dither sits at `x = -12` and is also clipped. No conditional logic.
 *
 * Two modes:
 *   - Static: pass `value` (0–100). Fixed fill percentage.
 *   - Loop:   pass `loop`. Fill animates 0→100% then snaps back, on repeat.
 *
 * The dither is STATIC by default (matches Figma). Pass `ditherAnimated`
 * for the two-phase flicker (game-UI shimmer effect).
 */

interface ScanProgressBarProps extends Omit<React.ComponentProps<"div">, "color"> {
  /** 0–100. Used when `loop` is false. */
  value?: number
  /** Auto-animate 0→100% on a loop. */
  loop?: boolean
  /** Full loop duration in ms (default 3600). Only applies when `loop` is true. */
  duration?: number
  /** Two-phase checkerboard flicker on the dither cells. Defaults to `loop` —
   *  shimmer-on while scanning, static while frozen (matches Figma). */
  ditherAnimated?: boolean
}

const FILL_STEPS = 20

function ScanProgressBar({
  value = 0,
  loop = false,
  duration = 3600,
  ditherAnimated,
  className,
  ...props
}: ScanProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value))
  const stepMs = duration / FILL_STEPS
  // Default the dither animation to track `loop` — alive while scanning,
  // static while frozen. Explicit prop overrides.
  const ditherIsAnimated = ditherAnimated ?? loop

  return (
    <div
      data-slot="scan-progress-bar"
      role="progressbar"
      aria-valuenow={loop ? undefined : clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={loop ? "scanning" : undefined}
      className={cn(
        "relative w-full h-(--size-mm-bar) bg-[var(--color-mm-tab-list-bg)] overflow-hidden",
        className,
      )}
      {...props}
    >
      <div
        data-slot="scan-progress-bar-fill"
        className="absolute top-0 left-0 h-full bg-[var(--color-mm-cyan)]"
        style={
          loop
            ? {
                width: "0%",
                animation: `mm-scan-fill ${duration}ms steps(${FILL_STEPS}, end) infinite`,
              }
            : {
                width: `${clamped}%`,
                // Defensively clear animation so a leftover loop-mode timeline
                // doesn't persist when switching back to static.
                animation: "none",
              }
        }
      >
        <Dither animated={ditherIsAnimated} stepMs={loop ? stepMs : 180} />
      </div>
    </div>
  )
}

/**
 * Dither — 3×3 checkerboard, 4×4 cells, 12×12 total. Sits at `right: -12px`
 * of its parent so it rides at the leading edge of the fill.
 *
 * Pattern (filled cells marked X):
 *   X . X
 *   . X .
 *   X . X
 *
 * Static rendering: filled cells are cyan, empty cells are transparent.
 * Animated rendering: cells alternate between phase A (above) and phase B
 * (inverse), creating a 2-frame 8-bit shimmer.
 */
function Dither({ animated, stepMs }: { animated: boolean; stepMs: number }) {
  const periodMs = stepMs * 4
  // 9-cell pattern: true = phase A (filled in static), false = phase B (empty in static)
  const phaseA = [true, false, true, false, true, false, true, false, true]

  return (
    <div
      aria-hidden
      className="absolute top-0 w-(--size-mm-bar) h-(--size-mm-bar) grid grid-cols-3 grid-rows-3"
      style={{ right: "calc(-1 * var(--size-mm-bar))" }}
    >
      {phaseA.map((isA, i) => (
        <span
          key={i}
          style={
            animated
              ? {
                  animation: `${isA ? "mm-dither-a" : "mm-dither-b"} ${periodMs}ms steps(1, end) infinite`,
                  // backgroundColor explicitly null so the cascade falls back to
                  // whatever the keyframes paint at this frame.
                  backgroundColor: undefined,
                }
              : {
                  backgroundColor: isA ? "var(--color-mm-cyan)" : "transparent",
                  // Defensively clear animation so a leftover timeline doesn't
                  // keep flickering after `animated` toggles to false.
                  animation: "none",
                }
          }
        />
      ))}
    </div>
  )
}

export { ScanProgressBar, type ScanProgressBarProps }
