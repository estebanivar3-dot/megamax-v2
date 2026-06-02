import * as React from "react"
import { Eye, EyeClosed, ChevronDown, ChevronUp } from "@nsmr/pixelart-react"
import { cn } from "@/lib/utils"

/**
 * SectionHeader — Vol. 2 Brutalist (211:1209)
 *
 * `EFFECTS                                 👁 ▾`
 *
 * Label (fg, mono `--text-mm-nano` tracking-1.08px uppercase) on the left,
 * `--size-mm-icon-xs` eye + chevron icons on the right. Both scale with the
 * Storybook `.mm-magnify` decorator. Bottom border `rgba(255,255,255,0.1)`.
 *
 * `visible` is "is this section's effect on" (eye state). `expanded` is "is
 * this section's controls shown" (chevron state). Independent toggles.
 *
 * The whole row is the expand trigger when `showExpandToggle` is on; the eye
 * stays an independent button and stops propagation so it doesn't also fire
 * the expand. Outer element is `role="button"` rather than `<button>` so the
 * nested eye button stays valid HTML.
 */

type SectionHeaderProps = {
  label: React.ReactNode
  visible?: boolean
  defaultVisible?: boolean
  onVisibleChange?: (visible: boolean) => void
  expanded?: boolean
  defaultExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  showVisibilityToggle?: boolean
  showExpandToggle?: boolean
  className?: string
} & Omit<React.ComponentProps<"div">, "children" | "onClick" | "onKeyDown">

function SectionHeader({
  label,
  visible,
  defaultVisible = true,
  onVisibleChange,
  expanded,
  defaultExpanded = true,
  onExpandedChange,
  showVisibilityToggle = true,
  showExpandToggle = true,
  className,
  ...props
}: SectionHeaderProps) {
  const [internalVisible, setInternalVisible] = React.useState(defaultVisible)
  const [internalExpanded, setInternalExpanded] = React.useState(defaultExpanded)

  const currVisible = visible ?? internalVisible
  const currExpanded = expanded ?? internalExpanded

  const toggleExpanded = () => {
    if (!showExpandToggle) return
    const next = !currExpanded
    if (expanded === undefined) setInternalExpanded(next)
    onExpandedChange?.(next)
  }

  const toggleVisible = () => {
    const next = !currVisible
    if (visible === undefined) setInternalVisible(next)
    onVisibleChange?.(next)
  }

  return (
    <div
      data-slot="section-header"
      data-visible={currVisible}
      data-expanded={currExpanded}
      role={showExpandToggle ? "button" : undefined}
      tabIndex={showExpandToggle ? 0 : undefined}
      aria-expanded={showExpandToggle ? currExpanded : undefined}
      aria-label={
        showExpandToggle
          ? currExpanded ? "Collapse section" : "Expand section"
          : undefined
      }
      onClick={showExpandToggle ? toggleExpanded : undefined}
      onKeyDown={
        showExpandToggle
          ? (e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault()
                toggleExpanded()
              }
            }
          : undefined
      }
      className={cn(
        "flex items-center justify-between gap-(--spacing-mm-8) w-full",
        "pt-(--spacing-mm-6) pb-[7px] border-b border-[var(--color-mm-border)]",
        "font-mono text-mm-nano leading-none tracking-mm-label uppercase text-[var(--color-mm-fg)]",
        showExpandToggle && "cursor-pointer select-none outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mm-brand)]",
        className,
      )}
      {...props}
    >
      <span data-slot="section-header-label" className="flex-1 min-w-0 truncate">{label}</span>
      <div className="flex items-center gap-(--spacing-mm-6) [&_svg]:size-(--size-mm-icon-xs) [&_svg]:[shape-rendering:crispEdges]">
        {showVisibilityToggle && (
          <button
            type="button"
            data-slot="section-header-visibility"
            aria-label={currVisible ? "Hide section" : "Show section"}
            aria-pressed={currVisible}
            onClick={(e) => {
              e.stopPropagation()
              toggleVisible()
            }}
            onKeyDown={(e) => {
              // Keep Enter/Space on the eye from bubbling to the row's expand handler.
              if (e.key === " " || e.key === "Enter") e.stopPropagation()
            }}
            className="cursor-pointer text-[var(--color-mm-muted)] hover:text-[var(--color-mm-fg)] transition-colors outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mm-brand)]"
          >
            {currVisible ? <Eye /> : <EyeClosed />}
          </button>
        )}
        {showExpandToggle && (
          <span
            data-slot="section-header-expand-indicator"
            aria-hidden
            className="text-[var(--color-mm-muted)]"
          >
            {currExpanded ? <ChevronUp /> : <ChevronDown />}
          </span>
        )}
      </div>
    </div>
  )
}

export { SectionHeader, type SectionHeaderProps }
