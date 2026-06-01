import * as React from "react"
import { ScrollArea as ScrollAreaPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

/**
 * ScrollArea — Vol. 2 Brutalist scrollable surface
 *
 * Wraps Radix `ScrollAreaPrimitive` so we render our own thumb instead of the
 * native macOS overlay scrollbar (which ignores `::-webkit-scrollbar-*` styling
 * when system prefs are set to "auto"). Use anywhere we need a guaranteed
 * hard-edged scrollbar — dropdowns, menus, side panels.
 *
 * `maxHeight` is applied to the inner Viewport so Radix's `overflow-y: scroll`
 * engages and the thumb appears when content exceeds. The **Root** also gets
 * `overflow-hidden` so any visual leak from Radix's inner `display: table`
 * content wrapper is clipped at the bordered card boundary. Defaults to
 * `type="hover"` so the thumb is visible whenever the cursor is over the
 * scroll surface — at rest the area looks clean, on engagement the brutalist
 * thumb signals "this scrolls" before the user has to discover it. Use
 * `type="always"` for surfaces where the scroll affordance must be visible
 * unconditionally (long menus, presentation views).
 *
 * Usage:
 *   <ScrollArea maxHeight={200}>...children...</ScrollArea>
 */

type ScrollAreaProps = React.ComponentProps<typeof ScrollAreaPrimitive.Root> & {
  maxHeight?: number | string
}

function ScrollArea({
  className,
  children,
  maxHeight,
  type = "hover",
  scrollHideDelay = 600,
  ...props
}: ScrollAreaProps) {
  const maxH = typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      type={type}
      scrollHideDelay={scrollHideDelay}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="w-full"
        style={maxH !== undefined ? { maxHeight: maxH } : undefined}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollAreaScrollbar orientation="vertical" />
      <ScrollAreaScrollbar orientation="horizontal" />
      <ScrollAreaPrimitive.Corner className="bg-transparent" />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollAreaScrollbar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Scrollbar>) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex select-none touch-none p-0 bg-transparent",
        "data-[state=visible]:animate-[mm-scrollbar-in_180ms_ease-out]",
        "data-[state=hidden]:animate-[mm-scrollbar-out_220ms_ease-in]",
        orientation === "vertical" && "h-full w-(--spacing-mm-8)",
        orientation === "horizontal" && "w-full h-(--spacing-mm-8) flex-col",
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb
        data-slot="scroll-area-thumb"
        className={cn(
          "relative flex-1 rounded-none",
          "bg-[var(--color-mm-muted-soft)] hover:bg-[var(--color-mm-muted)]",
          "min-h-[24px]",
        )}
      />
    </ScrollAreaPrimitive.Scrollbar>
  )
}

export { ScrollArea, type ScrollAreaProps }
