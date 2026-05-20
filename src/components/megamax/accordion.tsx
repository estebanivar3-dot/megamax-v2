import * as React from "react"
import { Accordion as AccordionPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Accordion — Vol. 2 Brutalist
 *
 * Built on Radix Accordion primitives (mirrors the shadcn API). Triggers
 * are uppercase mono labels with a visible cyan chevron that rotates 180°
 * when expanded. Item bodies animate height via `mm-accordion-down/up`
 * keyframes wired to Radix's `--radix-accordion-content-height` CSS var.
 *
 * Defaults to `type="single" collapsible` — pass `type="multiple"` to allow
 * many items open at once.
 *
 * Exports: Accordion, AccordionItem, AccordionTrigger, AccordionContent.
 */

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "w-full border-t border-[var(--color-mm-border)] first:border-t-0 last:border-b last:border-[var(--color-mm-border)]",
        className,
      )}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger w-full flex items-center justify-between gap-(--spacing-mm-6)",
          "py-(--spacing-mm-8) px-(--spacing-mm-8)",
          "font-mono font-medium text-mm-tiny uppercase tracking-mm-label cursor-pointer",
          "text-[var(--color-mm-fg)] hover:bg-[var(--color-mm-surface)]",
          "outline-none transition-colors text-left",
          "focus-visible:bg-[var(--color-mm-surface)]",
          className,
        )}
        {...props}
      >
        <span className="truncate">{children}</span>
        <ChevronDown
          data-slot="accordion-trigger-icon"
          aria-hidden
          className={cn(
            "size-[18px] shrink-0",
            "text-[var(--color-mm-fg)]",
            "transition-transform duration-200",
            "group-data-[state=open]/accordion-trigger:rotate-180",
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden",
        "data-[state=open]:animate-[mm-accordion-down_200ms_ease-out]",
        "data-[state=closed]:animate-[mm-accordion-up_200ms_ease-out]",
      )}
      {...props}
    >
      <div
        className={cn(
          "px-(--spacing-mm-8) pb-(--spacing-mm-8)",
          "font-mono text-mm-tiny text-[var(--color-mm-muted)] leading-(--leading-mm-normal)",
          "[&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-[var(--color-mm-fg)]",
          "[&_p:not(:last-child)]:mb-(--spacing-mm-8)",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  )
}

function ChevronDown({
  className,
  ...rest
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...rest}
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
