
import * as React from "react"
import { cn } from "@/lib/utils"

import { Tag, type TagColor } from "./tag"

/**
 * IndexRow — Vol. 2 Brutalist (39:860)
 *
 * Two row shapes, both extracted from Figma:
 *  - "section": section header with bottom border, label left + meta right.
 *    `RECENT BATCH EVENTS .......... LIVE`
 *  - "data":    marker square + id + label + dot-leader + status tag + timestamp.
 *    `■ 01  KB/RAW/TWEET/...  ........  [ ■ DONE ]  07h 12m`
 *
 * The dot-leader fill uses CSS `border-b-dotted` on a flex-1 spacer span.
 */

function IndexRowSection({
  label,
  meta,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "label"> & {
  label: React.ReactNode
  meta?: React.ReactNode
}) {
  return (
    <div
      data-slot="index-row"
      data-row-type="section"
      className={cn(
        "w-full flex items-center gap-(--spacing-mm-8) py-(--spacing-mm-6)",
        "border-b border-[var(--color-mm-border)]",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "flex-1 min-w-px font-mono font-normal text-mm-tiny",
          "uppercase tracking-mm-row text-[var(--color-mm-fg)] whitespace-nowrap",
        )}
      >
        {label}
      </span>
      {meta && (
        <span className="font-mono font-normal text-mm-tiny text-[var(--color-mm-fg-dim)] whitespace-nowrap">
          {meta}
        </span>
      )}
    </div>
  )
}

type IndexRowMarkerColor = TagColor | "muted"

const markerColorMap: Record<IndexRowMarkerColor, string> = {
  cyan:   "bg-[var(--color-mm-cyan)]",
  green:  "bg-[var(--color-mm-green)]",
  pink:   "bg-[var(--color-mm-pink)]",
  amber:  "bg-[var(--color-mm-amber)]",
  purple: "bg-[var(--color-mm-purple)]",
  muted:  "bg-[var(--color-mm-muted-soft)]",
}

interface IndexRowProps extends Omit<React.ComponentProps<"div">, "id" | "onClick"> {
  id?: React.ReactNode
  label: React.ReactNode
  /** marker square color. Defaults to green (matches "done" row in Figma). */
  markerColor?: IndexRowMarkerColor
  /** Status pill rendered as a Tag badge before the timestamp. */
  status?: { color: TagColor; label: React.ReactNode }
  /** Right-aligned trailing text (timestamp, duration). */
  trailing?: React.ReactNode
  muted?: boolean
  onClick?: () => void
}

function IndexRow({
  id,
  label,
  markerColor = "green",
  status,
  trailing,
  muted = false,
  onClick,
  className,
  ...props
}: IndexRowProps) {
  const interactive = typeof onClick === "function"
  return (
    <div
      data-slot="index-row"
      data-row-type="data"
      data-muted={muted}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                onClick?.()
              }
            }
          : undefined
      }
      className={cn(
        "group/index-row w-full min-w-0 flex items-center gap-(--spacing-mm-8) transition-colors",
        "px-(--spacing-mm-4) -mx-(--spacing-mm-4)",
        muted && "opacity-40",
        // hover surface only applies when the whole row is the click target
        interactive && "cursor-pointer hover:bg-[var(--color-mm-surface)]",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn("size-(--size-mm-dot) shrink-0", markerColorMap[markerColor])}
      />
      {id != null && (
        <span className="font-mono font-normal text-mm-row text-[var(--color-mm-fg-dim)] whitespace-nowrap">
          {id}
        </span>
      )}
      <span className="font-mono font-normal text-mm-tiny uppercase tracking-mm-row text-[var(--color-mm-fg)] truncate min-w-0">
        {label}
      </span>
      <span
        aria-hidden
        className="flex-1 min-w-(--spacing-mm-12) h-[3px] bg-[length:6px_3px] bg-repeat-x bg-center"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, var(--color-mm-muted) 1px, transparent 1.5px)",
        }}
      />
      {status && (
        <span className="shrink-0">
          <Tag type="badge" color={status.color}>
            {status.label}
          </Tag>
        </span>
      )}
      {trailing != null && (
        <span className="font-mono font-normal text-mm-tiny text-[var(--color-mm-fg)] whitespace-nowrap shrink-0">
          {trailing}
        </span>
      )}
    </div>
  )
}

export { IndexRow, IndexRowSection, type IndexRowProps, type IndexRowMarkerColor }
