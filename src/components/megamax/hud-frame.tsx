
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * HudFrame — Vol. 2 Brutalist
 *
 * Two layout modes, both extracted from Figma:
 *  - "solo"  (default): single panel with 4 corner brackets. Used in
 *    Aramaki Cadence (39:652), Operator Hero (40:1774), Memory 247 (40:2903).
 *  - "split": header strip with bottom border, then body panel below — no
 *    corner brackets. Used in Scan Vault (40:1531), Hybrid Console card
 *    (41:3090), WYRM (40:2131), and the small Memory cards (40:2273, 40:2599).
 */

type HudFrameMode = "solo" | "split"

const HudFrameContext = React.createContext<{ mode: HudFrameMode }>({ mode: "solo" })

function HudFrame({
  mode = "solo",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { mode?: HudFrameMode }) {
  return (
    <HudFrameContext.Provider value={{ mode }}>
      <div
        data-slot="hud-frame"
        data-mode={mode}
        className={cn(
          "relative bg-[var(--color-mm-bg)] flex flex-col items-start w-full",
          mode === "solo" && "p-(--spacing-mm-12) gap-(--spacing-mm-16)",
          className,
        )}
        {...props}
      >
        {children}
        {mode === "solo" && <HudFrameCornerBrackets />}
      </div>
    </HudFrameContext.Provider>
  )
}

function HudFrameCornerBrackets() {
  return (
    <>
      <span
        aria-hidden
        data-slot="hud-frame-corner"
        data-corner="tl"
        className="pointer-events-none absolute top-0 left-0 size-(--size-mm-bracket) border-t-2 border-l-2 border-[var(--color-mm-brand)]"
      />
      <span
        aria-hidden
        data-slot="hud-frame-corner"
        data-corner="tr"
        className="pointer-events-none absolute top-0 right-0 size-(--size-mm-bracket) border-t-2 border-r-2 border-[var(--color-mm-brand)]"
      />
      <span
        aria-hidden
        data-slot="hud-frame-corner"
        data-corner="bl"
        className="pointer-events-none absolute bottom-0 left-0 size-(--size-mm-bracket) border-b-2 border-l-2 border-[var(--color-mm-brand)]"
      />
      <span
        aria-hidden
        data-slot="hud-frame-corner"
        data-corner="br"
        className="pointer-events-none absolute bottom-0 right-0 size-(--size-mm-bracket) border-b-2 border-r-2 border-[var(--color-mm-brand)]"
      />
    </>
  )
}

/**
 * The split-mode header strip. Sits at the top of a `<HudFrame mode="split">`
 * and pairs with `<HudFramePanel>` below.
 */
function HudFrameHeaderStrip({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="hud-frame-header-strip"
      className={cn(
        "w-full bg-[var(--color-mm-bg)]",
        "border-b border-[var(--color-mm-border)]",
        "px-(--spacing-mm-12) py-(--spacing-mm-8)",
        "flex flex-col items-start",
        className,
      )}
      {...props}
    />
  )
}

/** Body half of a split-mode HudFrame. */
function HudFramePanel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="hud-frame-panel"
      className={cn(
        "w-full bg-[var(--color-mm-bg)]",
        "p-(--spacing-mm-12) flex flex-col items-start gap-(--spacing-mm-16)",
        className,
      )}
      {...props}
    />
  )
}

function HudFrameHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="hud-frame-header"
      className={cn("flex w-full items-center justify-between", className)}
      {...props}
    />
  )
}

function HudFrameTitle({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="hud-frame-title"
      className={cn(
        "font-mono font-bold text-mm-sm uppercase tracking-mm-title text-[var(--color-mm-fg)] whitespace-nowrap",
        className,
      )}
      {...props}
    />
  )
}

function HudFrameBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="hud-frame-body"
      className={cn("flex w-full flex-col items-start gap-(--spacing-mm-12)", className)}
      {...props}
    />
  )
}

export {
  HudFrame,
  HudFrameHeaderStrip,
  HudFramePanel,
  HudFrameHeader,
  HudFrameTitle,
  HudFrameBody,
  HudFrameContext,
}
