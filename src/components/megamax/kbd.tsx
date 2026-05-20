import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Kbd — Vol. 2 Brutalist atom
 *
 * Inline keyboard chip — plain mono uppercase text in `fg`. From Figma
 * (228:1459): 8px tracking-1.08px, normal weight. NO background or border —
 * the chip look is text-only.
 *
 * Use inside `<ShortcutHints>` for the full row pattern.
 */

function Kbd({
  className,
  children,
  ...props
}: React.ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "inline-flex items-center font-mono font-normal not-italic",
        "text-mm-nano leading-none tracking-mm-label uppercase",
        "text-[var(--color-mm-fg)]",
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  )
}

export { Kbd }
