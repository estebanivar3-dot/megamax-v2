import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 border border-[var(--color-mm-border)] bg-transparent px-2.5 py-1 text-base font-mono transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[var(--color-mm-fg)] placeholder:text-[var(--color-mm-muted-soft)] focus-visible:border-[var(--color-mm-brand)] focus-visible:ring-[3px] focus-visible:ring-[var(--color-mm-brand)]/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--color-mm-surface)]/50 disabled:opacity-50 aria-invalid:border-[var(--color-mm-pink)] aria-invalid:ring-[3px] aria-invalid:ring-[var(--color-mm-pink)]/20 md:text-sm bg-[var(--color-mm-surface)]/30",
        className,
      )}
      {...props}
    />
  )
}

export { Input }
