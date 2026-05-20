
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * InlineEditField + InlineEditInput — Vol. 2 Brutalist
 *
 * Label-above-input pattern with dashed bottom border on the input.
 * Used in Operator Console hero (40:1774) for NAME, CURRENT FOCUS, TAGS.
 *
 * The big hero variant (NAME = "LMK / Operator Console") is just an
 * InlineEditInput with a larger size prop.
 */

type InlineEditSize = "sm" | "md" | "lg"

const sizeMap: Record<InlineEditSize, string> = {
  sm: "text-mm-tiny font-medium tracking-mm-title",
  md: "text-mm-sm font-medium tracking-mm-title",
  lg: "text-mm-lg font-bold uppercase tracking-mm-title",
}

function InlineEditField({
  label,
  children,
  className,
  ...props
}: Omit<React.ComponentProps<"div">, "label"> & { label: React.ReactNode }) {
  return (
    <div
      data-slot="inline-edit-field"
      className={cn(
        // `group/inline-edit` enables the label to flip to brand-cyan when
        // any child contentEditable inside is focused.
        "group/inline-edit w-full flex flex-col items-start gap-(--spacing-mm-6)",
        className,
      )}
      {...props}
    >
      <span
        data-slot="inline-edit-label"
        className={cn(
          "font-mono font-normal text-mm-nano uppercase tracking-mm-label",
          "text-[var(--color-mm-muted-soft)] whitespace-nowrap transition-colors",
          "group-focus-within/inline-edit:text-[var(--color-mm-brand)]",
        )}
      >
        {label}
      </span>
      {children}
    </div>
  )
}

function InlineEditInput({
  size = "sm",
  defaultValue,
  placeholder,
  onChange,
  className,
}: {
  size?: InlineEditSize
  defaultValue?: string
  /** Shown when the field is empty (no defaultValue, no typed content). */
  placeholder?: string
  onChange?: (next: string) => void
  className?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (ref.current && ref.current.childNodes.length === 0 && defaultValue) {
      paintInto(ref.current, defaultValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleInput(e: React.FormEvent<HTMLDivElement>) {
    const el = e.currentTarget
    const offset = getCaretOffset(el)
    const text = el.textContent ?? ""
    paintInto(el, text)
    setCaretOffset(el, offset)
    onChange?.(text)
  }

  function handlePaste(e: React.ClipboardEvent<HTMLDivElement>) {
    e.preventDefault()
    const text = e.clipboardData.getData("text/plain")
    document.execCommand("insertText", false, text)
  }

  return (
    <div
      ref={ref}
      data-slot="inline-edit-input"
      data-size={size}
      data-placeholder={placeholder}
      role="textbox"
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onInput={handleInput}
      onPaste={handlePaste}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault()
          ;(e.currentTarget as HTMLElement).blur()
        }
      }}
      className={cn(
        "w-full bg-transparent outline-none font-mono",
        "pb-(--spacing-mm-6)",
        "border-b border-dashed border-[var(--color-mm-border)]",
        "focus:border-solid focus:border-[var(--color-mm-brand)]",
        "caret-[var(--color-mm-brand)] leading-(--leading-mm-snug) [word-break:break-word]",
        // Empty-state placeholder via :empty pseudo. paintInto() nukes children
        // when text is empty, so :empty matches when there's no content.
        placeholder &&
          "empty:before:content-[attr(data-placeholder)] empty:before:text-[var(--color-mm-muted-soft)] empty:before:pointer-events-none",
        sizeMap[size],
        className,
      )}
    />
  )
}

/**
 * Hero-size variant — single editable field with automatic two-tone
 * character coloring. Word characters (a-z A-Z 0-9) render in foreground;
 * everything else (spaces, punctuation, slashes, dashes…) renders muted.
 *
 * Implemented as a contentEditable div whose children are re-painted on
 * every input event with one styled <span> per character. Caret position
 * is preserved across re-renders via a character-offset round-trip.
 *
 * Wraps onto multiple lines so it never overflows the card.
 */
function InlineEditHero({
  defaultValue,
  placeholder,
  onChange,
  className,
}: {
  defaultValue?: string
  placeholder?: string
  onChange?: (next: string) => void
  className?: string
}) {
  const ref = React.useRef<HTMLDivElement>(null)

  // Initial paint — only runs once on mount
  React.useEffect(() => {
    if (ref.current && ref.current.childNodes.length === 0 && defaultValue) {
      paintInto(ref.current, defaultValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleInput(e: React.FormEvent<HTMLDivElement>) {
    const el = e.currentTarget
    const offset = getCaretOffset(el)
    const text = el.textContent ?? ""
    paintInto(el, text)
    setCaretOffset(el, offset)
    onChange?.(text)
  }

  function handlePaste(e: React.ClipboardEvent<HTMLDivElement>) {
    e.preventDefault()
    const text = e.clipboardData.getData("text/plain")
    document.execCommand("insertText", false, text)
  }

  return (
    <div
      ref={ref}
      data-slot="inline-edit-hero"
      data-placeholder={placeholder}
      role="textbox"
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      onInput={handleInput}
      onPaste={handlePaste}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault()
          ;(e.currentTarget as HTMLElement).blur()
        }
      }}
      className={cn(
        "w-full pb-(--spacing-mm-6) outline-none transition-colors",
        "border-b border-dashed border-[var(--color-mm-border)]",
        "focus:border-solid focus:border-[var(--color-mm-brand)]",
        "font-mono font-bold text-mm-lg uppercase tracking-mm-title",
        "leading-(--leading-mm-tight) [word-break:break-word]",
        "caret-[var(--color-mm-brand)]",
        placeholder &&
          "empty:before:content-[attr(data-placeholder)] empty:before:text-[var(--color-mm-muted-soft)] empty:before:pointer-events-none",
        className,
      )}
    />
  )
}

/**
 * Paint text into an element as one <span> per character, using safe DOM
 * methods (createElement + textContent — no innerHTML, no XSS risk).
 * Word chars → fg; everything else → muted.
 */
function paintInto(el: HTMLElement, text: string) {
  while (el.firstChild) el.removeChild(el.firstChild)
  for (const ch of text) {
    const span = document.createElement("span")
    span.textContent = ch
    span.style.color = /[a-zA-Z0-9]/.test(ch)
      ? "var(--color-mm-fg)"
      : "var(--color-mm-muted)"
    el.appendChild(span)
  }
}

function getCaretOffset(el: HTMLElement): number {
  const sel = window.getSelection()
  if (!sel || sel.rangeCount === 0) return 0
  const range = sel.getRangeAt(0)
  const pre = range.cloneRange()
  pre.selectNodeContents(el)
  pre.setEnd(range.endContainer, range.endOffset)
  return pre.toString().length
}

function setCaretOffset(el: HTMLElement, offset: number) {
  const sel = window.getSelection()
  if (!sel) return
  let charCount = 0
  let placed = false
  const range = document.createRange()

  const walk = (node: Node): void => {
    if (placed) return
    if (node.nodeType === Node.TEXT_NODE) {
      const len = node.textContent?.length ?? 0
      if (charCount + len >= offset) {
        range.setStart(node, Math.max(0, offset - charCount))
        range.collapse(true)
        placed = true
        return
      }
      charCount += len
    } else {
      for (const child of Array.from(node.childNodes)) {
        walk(child)
        if (placed) return
      }
    }
  }

  walk(el)
  if (!placed) {
    range.selectNodeContents(el)
    range.collapse(false)
  }
  sel.removeAllRanges()
  sel.addRange(range)
}

export {
  InlineEditField,
  InlineEditInput,
  InlineEditHero,
  // Shared paint helpers — reusable for any v2 input that wants per-character
  // muted/foreground coloring.
  paintInto,
  getCaretOffset,
  setCaretOffset,
}
