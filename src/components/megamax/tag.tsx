
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Tag — Vol. 2 Brutalist
 *
 * Three types:
 *  - "badge"      → bracketed status pill `[ ■ DONE ]`
 *  - "tag"        → hash chip `#WRITING ✕` — when `onRemove` is set the WHOLE
 *                   chip is a clickable delete button (not just the ×).
 *  - "simple-tag" → smaller hash chip without border
 *
 * Colors: cyan / green / pink / amber / purple.
 */

type TagColor = "cyan" | "green" | "pink" | "amber" | "purple"

const colorMap: Record<TagColor, { fg: string; fill: string; border: string }> = {
  cyan:   { fg: "text-[var(--color-mm-cyan)]",   fill: "bg-[var(--color-mm-cyan-fill)]",   border: "border-[var(--color-mm-cyan-border)]"   },
  green:  { fg: "text-[var(--color-mm-green)]",  fill: "bg-[var(--color-mm-green-fill)]",  border: "border-[var(--color-mm-green-border)]"  },
  pink:   { fg: "text-[var(--color-mm-pink)]",   fill: "bg-[var(--color-mm-pink-fill)]",   border: "border-[var(--color-mm-pink-border)]"   },
  amber:  { fg: "text-[var(--color-mm-amber)]",  fill: "bg-[var(--color-mm-amber-fill)]",  border: "border-[var(--color-mm-amber-border)]"  },
  purple: { fg: "text-[var(--color-mm-purple)]", fill: "bg-[var(--color-mm-purple-fill)]", border: "border-[var(--color-mm-purple-border)]" },
}

const squareBgMap: Record<TagColor, string> = {
  cyan:   "bg-[var(--color-mm-cyan)]",
  green:  "bg-[var(--color-mm-green)]",
  pink:   "bg-[var(--color-mm-pink)]",
  amber:  "bg-[var(--color-mm-amber)]",
  purple: "bg-[var(--color-mm-purple)]",
}

const tagVariants = cva(
  "inline-flex items-center font-mono font-normal whitespace-nowrap transition-opacity",
  {
    variants: {
      type: {
        badge:      "border px-(--spacing-mm-8) py-(--spacing-mm-4) gap-(--spacing-mm-6) text-mm-tiny",
        tag:        "border px-(--spacing-mm-8) py-(--spacing-mm-4) gap-(--spacing-mm-6) text-mm-nano",
        "simple-tag": "px-(--spacing-mm-4) py-(--spacing-mm-2) text-mm-nano",
      },
      state: {
        default:  "",
        disabled: "opacity-50",
      },
    },
    defaultVariants: { type: "badge", state: "default" },
  },
)

interface TagProps extends Omit<React.ComponentProps<"button">, "color">, VariantProps<typeof tagVariants> {
  color?: TagColor
  label?: React.ReactNode
  /** When set on "tag" type, the whole chip becomes a clickable delete button. */
  onRemove?: () => void
}

function Tag({
  className,
  type = "badge",
  state = "default",
  color = "cyan",
  label,
  children,
  onRemove,
  ...props
}: TagProps) {
  const c = colorMap[color]
  const content = label ?? children

  if (type === "badge") {
    return (
      <span
        data-slot="tag"
        data-type="badge"
        data-color={color}
        data-state={state}
        className={cn(tagVariants({ type, state }), c.fg, c.fill, c.border, className)}
      >
        <span aria-hidden className={cn("tracking-mm-title uppercase", c.fg)}>[</span>
        <span aria-hidden className={cn("size-(--size-mm-dot) shrink-0", squareBgMap[color])} />
        <span className={cn("tracking-mm-pill", c.fg)}>{content}</span>
        <span aria-hidden className={cn("tracking-mm-title uppercase", c.fg)}>]</span>
      </span>
    )
  }

  // tag / simple-tag
  const removable = typeof onRemove === "function"
  const SharedInner = (
    <>
      <span className={cn("flex items-center gap-(--spacing-mm-2) tracking-mm-pill uppercase", c.fg)}>
        <span aria-hidden>#</span>
        <span>{content}</span>
      </span>
      {removable && (
        // tag: × is always visible (with a small gap)
        // simple-tag: × is collapsed (max-width:0 + opacity:0) when idle and
        // smoothly expands+fades on hover — keeps the chip tight when idle
        // AND gives a non-aggressive reveal animation on hover.
        <span
          aria-hidden
          className={cn(
            "inline-flex items-center overflow-hidden",
            c.fg,
            type === "tag"
              ? "ml-(--spacing-mm-4)"
              : "max-w-0 opacity-0 ml-0 group-hover/tag:max-w-(--spacing-mm-16) group-hover/tag:opacity-100 group-hover/tag:ml-(--spacing-mm-4) transition-[max-width,opacity,margin-left] duration-150 ease-out",
          )}
        >
          {/* simple-tag hover X is bigger than the label so it reads as
              an action affordance, not part of the word. */}
          <XCloseIcon className="size-(--size-mm-icon-xs)" />
        </span>
      )}
    </>
  )

  if (removable) {
    return (
      <button
        type="button"
        aria-label={typeof content === "string" ? `Remove tag ${content}` : "Remove tag"}
        onClick={onRemove}
        data-slot="tag"
        data-type={type}
        data-color={color}
        data-state={state}
        className={cn(
          // local `group/tag` so the × can show on hover scoped to THIS chip
          "group/tag",
          tagVariants({ type, state }),
          c.fg,
          c.fill,
          type === "tag" && c.border,
          "cursor-pointer hover:opacity-80",
          "outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mm-brand)]",
          className,
        )}
        {...props}
      >
        {SharedInner}
      </button>
    )
  }

  return (
    <span
      data-slot="tag"
      data-type={type}
      data-color={color}
      data-state={state}
      className={cn(tagVariants({ type, state }), c.fg, c.fill, type === "tag" && c.border, className)}
    >
      {SharedInner}
    </span>
  )
}

function XCloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 8 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M2 2L6 6M6 2L2 6" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
    </svg>
  )
}

export { Tag, tagVariants, type TagColor, type TagProps }
