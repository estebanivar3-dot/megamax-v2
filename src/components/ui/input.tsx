import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full min-w-0 px-(--spacing-mm-6) py-(--spacing-mm-4)",
        "font-mono text-mm-tiny leading-(--leading-mm-normal)",
        "border border-[var(--color-mm-border)] bg-[var(--color-mm-surface)]/30 text-[var(--color-mm-fg)]",
        "outline-none transition-colors",
        "placeholder:text-[var(--color-mm-muted-soft)] placeholder:uppercase",
        "focus:border-[var(--color-mm-brand)]",
        "aria-invalid:border-[var(--color-mm-pink)]",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--color-mm-surface)]/50 disabled:opacity-50",
        "file:inline-flex file:border-0 file:bg-transparent file:text-mm-tiny file:font-medium file:text-[var(--color-mm-fg)]",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
