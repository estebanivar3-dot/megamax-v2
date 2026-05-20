
import * as React from "react"
import { cn } from "@/lib/utils"
import { Tag, type TagColor } from "./tag"
import { paintInto, getCaretOffset, setCaretOffset } from "./inline-edit"

/**
 * TagInput — Vol. 2 Brutalist
 *
 * Two modes:
 *  1. Container mode: just renders children inside a bordered container.
 *  2. Stateful mode: pass `defaultTags` to enable editing.
 *     - Type into trailing field + Enter / comma → add tag
 *     - Backspace on empty field → remove last tag
 *     - Click any chip → remove it
 *     - Input field uses the v2 per-character paint (word chars white,
 *       special chars muted) for visual consistency with InlineEditInput.
 *     - Colors cycle: cyan, pink, amber, green, purple
 */

const colorCycle: TagColor[] = ["cyan", "pink", "amber", "green", "purple"]

interface TagInputProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  density?: "default" | "compact"
  defaultTags?: string[]
  onChange?: (tags: string[]) => void
  placeholder?: string
}

function TagInput({
  density = "default",
  defaultTags,
  onChange,
  placeholder = "add tag...",
  className,
  children,
  ...props
}: TagInputProps) {
  const stateful = defaultTags !== undefined

  const baseClass = cn(
    "w-full flex flex-wrap items-center border border-[var(--color-mm-border)]",
    "transition-colors focus-within:border-[var(--color-mm-brand)]",
    density === "compact"
      ? "p-(--spacing-mm-4) gap-(--spacing-mm-4)"
      : "p-(--spacing-mm-8) gap-[10px]",
    stateful && "cursor-text",
    className,
  )

  if (!stateful) {
    return (
      <div data-slot="tag-input" data-density={density} className={baseClass} {...props}>
        {children}
      </div>
    )
  }

  return (
    <StatefulTagInput
      defaultTags={defaultTags!}
      onChange={onChange}
      placeholder={placeholder}
      density={density}
      baseClass={baseClass}
    />
  )
}

function StatefulTagInput({
  defaultTags,
  onChange,
  placeholder,
  density,
  baseClass,
}: {
  defaultTags: string[]
  onChange?: (tags: string[]) => void
  placeholder: string
  density: "default" | "compact"
  baseClass: string
}) {
  const [tags, setTags] = React.useState<string[]>(defaultTags)
  const [input, setInput] = React.useState("")
  const inputRef = React.useRef<HTMLDivElement>(null)

  function emit(next: string[]) {
    setTags(next)
    onChange?.(next)
  }

  function clearInput() {
    if (inputRef.current) paintInto(inputRef.current, "")
    setInput("")
  }

  function addTag(raw: string) {
    const trimmed = raw.trim().toLowerCase()
    if (trimmed && !tags.includes(trimmed)) {
      emit([...tags, trimmed])
    }
    clearInput()
  }

  function removeAt(i: number) {
    emit(tags.filter((_, idx) => idx !== i))
  }

  function handleInput(e: React.FormEvent<HTMLDivElement>) {
    const el = e.currentTarget
    const offset = getCaretOffset(el)
    const text = el.textContent ?? ""
    paintInto(el, text)
    setCaretOffset(el, offset)
    setInput(text)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag(input)
    } else if (e.key === "Backspace" && input === "" && tags.length > 0) {
      removeAt(tags.length - 1)
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLDivElement>) {
    e.preventDefault()
    const text = e.clipboardData.getData("text/plain")
    document.execCommand("insertText", false, text)
  }

  return (
    <div
      data-slot="tag-input"
      data-density={density}
      className={baseClass}
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((t, i) => (
        <Tag
          key={t + i}
          type={density === "compact" ? "simple-tag" : "tag"}
          color={colorCycle[i % colorCycle.length]}
          onRemove={() => removeAt(i)}
        >
          {t}
        </Tag>
      ))}
      <div className="relative flex-1 min-w-0">
        {input === "" && tags.length === 0 && (
          <span
            aria-hidden
            className="absolute inset-0 pointer-events-none flex items-center font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted-soft)] normal-case"
          >
            {placeholder}
          </span>
        )}
        <div
          ref={inputRef}
          role="textbox"
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onBlur={() => { if (input) addTag(input) }}
          className={cn(
            "outline-none bg-transparent font-mono",
            "text-mm-nano uppercase tracking-mm-pill",
            "whitespace-nowrap overflow-hidden",
          )}
        />
      </div>
    </div>
  )
}

export { TagInput, type TagInputProps }
