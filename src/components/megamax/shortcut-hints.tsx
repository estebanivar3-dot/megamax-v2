import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * ShortcutHints — Vol. 2 Brutalist (228:1368)
 *
 * `CTRL+. SHORTCUTS  |  CTRL+J CANCEL  |  SHIFT+TAB MODE`
 *
 * Hints separated by thin 9px vertical lines (`--color-mm-border`). Each
 * hint is a key chunk (fg) + label (muted), 8px tracking-1.08px uppercase.
 * The key text is just an `fg`-colored span — the row root already supplies
 * the mono/nano/tracking/uppercase styling. Container gap-[6px].
 */

type Hint = {
  keys: string
  label: React.ReactNode
}

type ShortcutHintsProps = {
  hints?: Hint[]
  className?: string
  children?: React.ReactNode
}

function ShortcutHintsRoot({ hints, className, children }: ShortcutHintsProps) {
  return (
    <div
      data-slot="shortcut-hints"
      className={cn(
        "inline-flex items-center gap-(--spacing-mm-6) flex-wrap",
        "font-mono font-normal text-mm-nano leading-none tracking-mm-label uppercase",
        className,
      )}
    >
      {children ?? hints?.map((h, i) => (
        <React.Fragment key={i}>
          {i > 0 && <ShortcutHintSep />}
          <span className="inline-flex items-center gap-(--spacing-mm-4)">
            <span className="text-[var(--color-mm-fg)]">{h.keys}</span>
            <span className="text-[var(--color-mm-muted)]">{h.label}</span>
          </span>
        </React.Fragment>
      ))}
    </div>
  )
}

function ShortcutHintSep() {
  return (
    <span
      aria-hidden
      className="inline-block w-px h-[1em] bg-[var(--color-mm-border)] shrink-0"
    />
  )
}

const ShortcutHints = Object.assign(ShortcutHintsRoot, { Sep: ShortcutHintSep })

export { ShortcutHints, type ShortcutHintsProps, type Hint }
