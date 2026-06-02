import * as React from "react"
import { cn } from "@/lib/utils"

type HudInputProps = React.ComponentProps<"input"> & {
  /** Draws a 1px border around the cell. Default `true` (HUD form-field look).
   *  Pass `false` for the bare Figma slot variant (183:12246) used in FieldRow. */
  bordered?: boolean
}

function HudInput({
  className,
  bordered = true,
  ...props
}: HudInputProps) {
  return (
    <input
      data-slot="hud-input"
      data-bordered={bordered}
      className={cn(
        "w-full min-w-0 px-(--spacing-mm-6) py-(--spacing-mm-4)",
        "font-mono text-mm-tiny leading-(--leading-mm-normal)",
        "bg-[var(--color-mm-tab-list-bg)] text-[var(--color-mm-muted)]",
        "outline-none transition-colors",
        bordered
          ? "border border-[var(--color-mm-border)] focus:border-[var(--color-mm-brand)]"
          : "border-0",
        "placeholder:text-[var(--color-mm-muted-soft)]/40 placeholder:uppercase",
        "focus:text-[var(--color-mm-fg)]",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

function HudInputGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="hud-input-group"
      className={cn(
        "group/hud-input flex flex-col gap-(--spacing-mm-8)",
        className,
      )}
      {...props}
    />
  )
}

function HudInputHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="hud-input-header"
      className={cn("flex items-center justify-between", className)}
      {...props}
    />
  )
}

function HudInputLabel({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="hud-input-label"
      className={cn(
        "font-mono text-mm-nano uppercase tracking-mm-label transition-colors",
        "text-[var(--color-mm-muted-soft)]/60 group-has-[input:focus]/hud-input:text-[var(--color-mm-brand)]",
        className,
      )}
      {...props}
    />
  )
}

function HudInputStatus({
  className,
  children,
  activeChildren,
  ...props
}: React.ComponentProps<"span"> & { activeChildren?: React.ReactNode }) {
  return (
    <span
      data-slot="hud-input-status"
      className={cn(
        "font-mono text-mm-nano uppercase tracking-mm-label transition-colors",
        "text-[var(--color-mm-muted-soft)]/40 group-has-[input:focus]/hud-input:text-[var(--color-mm-fg)]",
        className,
      )}
      {...props}
    >
      <span className="group-has-[input:focus]/hud-input:hidden">{children}</span>
      {activeChildren && (
        <span className="hidden group-has-[input:focus]/hud-input:inline">{activeChildren}</span>
      )}
    </span>
  )
}

export {
  HudInput,
  HudInputGroup,
  HudInputHeader,
  HudInputLabel,
  HudInputStatus,
  type HudInputProps,
}
