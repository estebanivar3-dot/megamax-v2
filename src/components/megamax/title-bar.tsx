import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * TitleBar — Vol. 2 Brutalist panel header strip (183:240)
 *
 * `WYRM ······························ 06:04:11 — LAST.FM`
 *
 * Mono **bold** title on the left, optional **muted-soft regular** status
 * slot on the right. Bottom border so it pairs with a body region below.
 *
 * Structure is column-outer + row-inner (matches Figma's HudFrame pattern):
 * the column wrapper exists for forward-compat so a subtitle/breadcrumb row
 * can land under the title row without restructuring consumers.
 *
 * Title prop accepts a string or any node — pass `breadcrumb` for the
 * `/USERS/ESTEBAN/CHAT` pattern or use children directly.
 */

type TitleBarProps = {
  title?: React.ReactNode
  status?: React.ReactNode
  className?: string
  children?: React.ReactNode
} & Omit<React.ComponentProps<"div">, "title" | "children">

function TitleBar({ title, status, className, children, ...props }: TitleBarProps) {
  return (
    <div
      data-slot="title-bar"
      className={cn(
        "flex flex-col items-stretch w-full",
        "px-(--spacing-mm-12) py-(--spacing-mm-8)",
        "bg-[var(--color-mm-bg)] border-b border-[var(--color-mm-border)]",
        "font-mono uppercase",
        className,
      )}
      {...props}
    >
      <div
        data-slot="title-bar-row"
        className="flex items-center justify-between gap-(--spacing-mm-12) w-full whitespace-nowrap"
      >
        <span
          data-slot="title-bar-title"
          className="font-bold text-mm-tiny tracking-mm-title text-[var(--color-mm-fg)] truncate"
        >
          {title ?? children}
        </span>
        {status && (
          <span
            data-slot="title-bar-status"
            className="font-normal text-mm-nano tracking-mm-label text-[var(--color-mm-muted-soft)] truncate"
          >
            {status}
          </span>
        )}
      </div>
    </div>
  )
}

export { TitleBar, type TitleBarProps }
