import * as React from "react"
import { ToggleButton } from "./toggle-button"
import { cn } from "@/lib/utils"

/**
 * ToggleRow — Vol. 2 Brutalist (211:1171)
 *
 * `Bloom [On Off]` — left label (fg, mono 8px tracking-1.08px uppercase) +
 * right inline group of `<ToggleButton>` segments. The label is full-bright,
 * not muted (Figma uses #fafafa for it).
 *
 * Uncontrolled by default — pass `defaultValue`. Controlled via `value` +
 * `onValueChange`.
 */

type ToggleOption<T extends string> = {
  value: T
  label: React.ReactNode
}

type ToggleRowProps<T extends string> = {
  label: React.ReactNode
  options: ToggleOption<T>[]
  value?: T
  defaultValue?: T
  onValueChange?: (value: T) => void
  className?: string
}

function ToggleRow<T extends string>({
  label,
  options,
  value,
  defaultValue,
  onValueChange,
  className,
}: ToggleRowProps<T>) {
  const [internal, setInternal] = React.useState<T | undefined>(defaultValue)
  const current = value ?? internal

  return (
    <div
      data-slot="toggle-row"
      className={cn("flex items-center gap-(--spacing-mm-12) w-full", className)}
    >
      <div
        data-slot="toggle-row-label"
        className="flex-1 min-w-0 font-mono text-mm-nano leading-none tracking-mm-label uppercase text-[var(--color-mm-fg)]"
      >
        {label}
      </div>
      <div
        data-slot="toggle-row-group"
        role="group"
        aria-label={typeof label === "string" ? label : undefined}
        className="inline-flex items-center shrink-0"
      >
        {options.map((opt) => (
          <ToggleButton
            key={opt.value}
            active={opt.value === current}
            onClick={() => {
              if (value === undefined) setInternal(opt.value)
              onValueChange?.(opt.value)
            }}
          >
            {opt.label}
          </ToggleButton>
        ))}
      </div>
    </div>
  )
}

export { ToggleRow, type ToggleRowProps, type ToggleOption }
