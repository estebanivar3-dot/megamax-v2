import * as React from "react"
import { Kbd } from "./kbd"
import { cn } from "@/lib/utils"

/**
 * ShortcutHints — Vol. 2 Brutalist (228:1368)
 *
 * `CTRL+. SHORTCUTS  |  CTRL+J CANCEL  |  SHIFT+TAB MODE`
 *
 * Hints separated by thin 9px vertical lines (`--color-mm-border`). Each
 * hint is `<Kbd>keys</Kbd>` (fg) + `<span>label</span>` (muted), 8px tracking-
 * 1.08px uppercase. Container gap-[6px].
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
            <Kbd>{h.keys}</Kbd>
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
      className="inline-block w-px h-[9px] bg-[var(--color-mm-border)] shrink-0"
    />
  )
}

const ShortcutHints = Object.assign(ShortcutHintsRoot, { Sep: ShortcutHintSep })

export { ShortcutHints, type ShortcutHintsProps, type Hint }
