import * as React from "react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "./scroll-area"

/**
 * PromptBox — Vol. 2 Brutalist (183:11273)
 *
 * Outer: `--color-mm-bg` surface, a heavier `rgba(255,255,255,0.15)` border
 * (one-off, brighter than `--color-mm-border`), `p-(--spacing-mm-8)`, flex
 * column with `gap-(--spacing-mm-12)`.
 *
 * Top: textarea with `>_` placeholder; auto-grows up to `maxLines` (default 3),
 * then yields to the brutalist `ScrollArea` for overflow. Textarea itself has
 * `overflow-hidden` so the native scrollbar never appears — Radix ScrollArea
 * paints our own hard-edged thumb in `--color-mm-muted-soft`.
 *
 * Bottom: full-width row with `leading` slot on the left, `trailing` slot on
 * the right, separated by `flex-1`.
 */

type PromptBoxProps = {
  value?: string
  defaultValue?: string
  placeholder?: string
  onValueChange?: (value: string) => void
  onSubmit?: (value: string) => void
  leading?: React.ReactNode
  trailing?: React.ReactNode
  /** Max lines before the ScrollArea takes over. Default 3. */
  maxLines?: number
  className?: string
  textareaClassName?: string
} & Omit<React.ComponentProps<"div">, "onSubmit">

function PromptBox({
  value,
  defaultValue = "",
  placeholder = ">_ASK FOLLOW UP QUESTION...",
  onValueChange,
  onSubmit,
  leading,
  trailing,
  maxLines = 3,
  className,
  textareaClassName,
  ...props
}: PromptBoxProps) {
  const [internal, setInternal] = React.useState(defaultValue)
  const current = value ?? internal
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  // Auto-grow: reset height each tick then set to scrollHeight so the textarea
  // always matches its content height. ScrollArea's maxHeight is the cap.
  React.useLayoutEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = "auto"
    ta.style.height = `${ta.scrollHeight}px`
  }, [current])

  // 1.5 line-height × maxLines, in em so it scales with the magnify decorator.
  const scrollMaxHeight = `${maxLines * 1.5}em`

  return (
    <div
      data-slot="prompt-box"
      className={cn(
        "flex flex-col gap-(--spacing-mm-12) w-full p-(--spacing-mm-8)",
        "bg-[var(--color-mm-bg)] border border-[rgba(255,255,255,0.15)]",
        "focus-within:border-[rgba(255,255,255,0.25)] transition-colors",
        className,
      )}
      {...props}
    >
      <ScrollArea
        maxHeight={scrollMaxHeight}
        className="font-mono text-mm-tiny leading-(--leading-mm-normal) w-full"
      >
        <textarea
          ref={textareaRef}
          data-slot="prompt-box-textarea"
          rows={1}
          placeholder={placeholder}
          value={current}
          onChange={(e) => {
            if (value === undefined) setInternal(e.target.value)
            onValueChange?.(e.target.value)
          }}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault()
              onSubmit?.(current)
            }
          }}
          className={cn(
            "block w-full resize-none overflow-hidden bg-transparent outline-none border-0 p-0",
            "font-mono font-normal text-mm-tiny leading-(--leading-mm-normal) uppercase",
            "text-[var(--color-mm-fg)] placeholder:text-[var(--color-mm-placeholder)]",
            textareaClassName,
          )}
        />
      </ScrollArea>

      <div
        data-slot="prompt-box-toolbar"
        className="flex items-center gap-(--spacing-mm-6) w-full"
      >
        <div className="flex items-center shrink-0">{leading}</div>
        <div className="flex-1" />
        <div className="flex items-center gap-(--spacing-mm-6) shrink-0">{trailing}</div>
      </div>
    </div>
  )
}

export { PromptBox, type PromptBoxProps }
