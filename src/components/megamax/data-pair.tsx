
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * DataPair / DataPairInline — Vol. 2 Brutalist
 *
 * 8px label + 8px value pair. The "inline" variant has a subtle bottom
 * border and is meant to stack inside an "AT A GLANCE" sidebar
 * (Operator Console hero 40:1787).
 *
 * Stacked variant (FROM / LOCAL DRIVE) is just a flex-col with no border.
 */

function DataPair({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="data-pair"
      className={cn("flex flex-col items-start gap-(--spacing-mm-6)", className)}
      {...props}
    />
  )
}

function DataPairLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="data-pair-label"
      className={cn(
        "font-mono font-normal text-mm-nano uppercase tracking-mm-label whitespace-nowrap",
        "text-[var(--color-mm-muted-soft)]",
        className,
      )}
      {...props}
    />
  )
}

function DataPairValue({
  className,
  accent,
  ...props
}: React.ComponentProps<"span"> & { accent?: boolean }) {
  return (
    <span
      data-slot="data-pair-value"
      data-accent={accent}
      className={cn(
        "font-mono font-medium text-mm-nano uppercase tracking-mm-title whitespace-nowrap",
        accent ? "text-[var(--color-mm-cyan)]" : "text-[var(--color-mm-fg)]",
        className,
      )}
      {...props}
    />
  )
}

function DataPairInline({
  label,
  value,
  accent,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "label"> & {
  label: React.ReactNode
  value: React.ReactNode
  accent?: boolean
}) {
  return (
    <div
      data-slot="data-pair-inline"
      data-accent={accent}
      className={cn(
        "w-full flex items-center justify-between pt-(--spacing-mm-6) pb-[7px]",
        "border-b border-[var(--color-mm-border)]",
        className,
      )}
      {...props}
    >
      <DataPairLabel>{label}</DataPairLabel>
      <DataPairValue accent={accent}>{value}</DataPairValue>
    </div>
  )
}

export { DataPair, DataPairLabel, DataPairValue, DataPairInline }
