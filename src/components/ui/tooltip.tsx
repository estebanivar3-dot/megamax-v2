"use client"

import * as React from "react"
import { Tooltip as TooltipPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

/**
 * Tooltip — Vol. 2 Brutalist
 *
 * Radix tooltip ported with mm-* tokens. Sharp edges, mono nano text,
 * brand-cyan arrow, instant open (delayDuration=0).
 *
 * Wrap your tree once with <TooltipProvider> at app root or per-story.
 */

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  )
}

function Tooltip(props: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger(
  props: React.ComponentProps<typeof TooltipPrimitive.Trigger>,
) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  sideOffset = 6,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "z-50 inline-flex w-fit max-w-xs items-center gap-(--spacing-mm-6)",
          "px-(--spacing-mm-8) py-(--spacing-mm-4)",
          "bg-[var(--color-mm-fg)] text-[var(--color-mm-bg)]",
          "font-mono font-medium text-mm-nano uppercase tracking-mm-label",
          "shadow-[var(--shadow-mm-label-strong)]",
          // subtle entry per side
          "data-[side=bottom]:animate-in data-[side=bottom]:fade-in-0 data-[side=bottom]:slide-in-from-top-1",
          "data-[side=top]:animate-in data-[side=top]:fade-in-0 data-[side=top]:slide-in-from-bottom-1",
          "data-[side=left]:animate-in data-[side=left]:fade-in-0 data-[side=left]:slide-in-from-right-1",
          "data-[side=right]:animate-in data-[side=right]:fade-in-0 data-[side=right]:slide-in-from-left-1",
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="z-50 size-2 translate-y-[calc(-50%_-_1px)] rotate-45 fill-[var(--color-mm-fg)]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }
