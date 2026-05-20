import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Badge — Vol. 2 Brutalist (228:2226)
 *
 * `--size-mm-badge` square minimum (11px base / 18px magnified), hugs wider
 * for multi-character content. Geist Mono Medium at `--text-mm-pico` (6/10)
 * with `tracking-mm-tab` (0.7px) on `--color-mm-surface` bg +
 * `--color-mm-border` outline. Use inside `<NavItem badge={...}>` for
 * sidebar count chips and similar. Container, padding, and text all magnify
 * together, so the cap-to-edge ratio stays constant across both renders.
 *
 * Active-state inversion: when nested inside any element with `group` class
 * + `data-active="true"` (NavItem provides both), the badge flips to
 * dark-on-light so it stays legible against the bright active-row bg. The
 * hardcoded rgba blacks are Figma-spec (228:1815 active variant) and have no
 * token equivalent because they only exist in this contrast context.
 *
 */

type BadgeProps = React.ComponentProps<"span">

function Badge({ className, children, ...props }: BadgeProps) {
  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center justify-center min-w-(--size-mm-badge) h-(--size-mm-badge) px-(--spacing-mm-2)",
        "bg-[var(--color-mm-surface)] border border-[var(--color-mm-border)]",
        "font-mono font-medium text-mm-pico leading-none tracking-mm-tab",
        "text-[var(--color-mm-fg)] uppercase whitespace-nowrap",
        "group-data-[active=true]:bg-[rgba(0,0,0,0.1)] group-data-[active=true]:border-[rgba(0,0,0,0.15)] group-data-[active=true]:text-[var(--color-mm-on-brand)]",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export { Badge, type BadgeProps }
