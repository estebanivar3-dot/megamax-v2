import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * FramedInput — Vol. 2 Brutalist (216:899)
 *
 * Bordered container with up to four corner-positioned label tags (TL / TR
 * / BL / BR). Two visual variants:
 *
 *  - **default**: tags float over the container border with `bg-mm-bg`
 *    masking the seam underneath. Looks like a label dropped on top.
 *  - **border-label**: tags have `border-l` + `border-r` matching the
 *    container border, so they visually notch into the frame as continuous
 *    extensions. Looks like a label cut into the border.
 *
 * Use as a wrapper around inputs, sliders, gauges — anywhere you want
 * "this control has named meta on its corners" framing. Children sit in the
 * inner content area; pass any combination of `topLeft` / `topRight` /
 * `bottomLeft` / `bottomRight` for the tags.
 */

type FramedInputVariant = "default" | "border-label"

type FramedInputProps = {
  variant?: FramedInputVariant
  topLeft?: React.ReactNode
  topRight?: React.ReactNode
  bottomLeft?: React.ReactNode
  bottomRight?: React.ReactNode
  className?: string
  children?: React.ReactNode
} & Omit<React.ComponentProps<"div">, "children">

function FramedInput({
  variant = "default",
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  className,
  children,
  ...props
}: FramedInputProps) {
  return (
    <div data-slot="framed-input-wrapper" className="py-(--spacing-mm-6) w-full">
      <div
        data-slot="framed-input"
        data-variant={variant}
        className={cn(
          "relative bg-[var(--color-mm-bg)] border border-[var(--color-mm-border)]",
          "p-(--spacing-mm-16) flex flex-col items-start gap-(--spacing-mm-8) w-full",
          className,
        )}
        {...props}
      >
        {children}
        {topLeft && <FramedInputTag position="tl" variant={variant}>{topLeft}</FramedInputTag>}
        {topRight && <FramedInputTag position="tr" variant={variant}>{topRight}</FramedInputTag>}
        {bottomLeft && <FramedInputTag position="bl" variant={variant}>{bottomLeft}</FramedInputTag>}
        {bottomRight && <FramedInputTag position="br" variant={variant}>{bottomRight}</FramedInputTag>}
      </div>
    </div>
  )
}

type FramedInputTagProps = {
  position: "tl" | "tr" | "bl" | "br"
  variant: FramedInputVariant
  children: React.ReactNode
}

function FramedInputTag({ position, variant, children }: FramedInputTagProps) {
  const isTop = position === "tl" || position === "tr"
  const isLeft = position === "tl" || position === "bl"
  return (
    <span
      data-slot="framed-input-tag"
      data-position={position}
      className={cn(
        "absolute flex items-center px-(--spacing-mm-8) overflow-hidden",
        "bg-[var(--color-mm-bg)]",
        "font-mono text-mm-nano leading-none text-[var(--color-mm-muted)] whitespace-nowrap",
        variant === "border-label" && "border-l border-r border-[var(--color-mm-border)]",
        // Center the tag's vertical midline on the panel border via
        // transform: translateY(±50%). This auto-aligns at any text size —
        // hardcoded `-top-[6px]` would drift when text-mm-nano magnifies
        // from 8px → 13px, since the px offset is calibrated for one size.
        isTop ? "top-0 -translate-y-1/2" : "bottom-0 translate-y-1/2",
        isLeft ? "left-[15px]" : "right-[15px]",
      )}
    >
      {children}
    </span>
  )
}

export { FramedInput, type FramedInputProps, type FramedInputVariant }
