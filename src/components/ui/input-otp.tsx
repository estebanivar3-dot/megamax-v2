"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { cn } from "@/lib/utils"

/**
 * InputOTP — Vol. 2 Brutalist
 *
 * Ported from megamax-ds shadcn input-otp. Box-style slots, brand-cyan active
 * ring, blinking caret, mm-* tokens throughout.
 */

function InputOTP({
  className,
  containerClassName,
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string
}) {
  return (
    <OTPInput
      data-slot="input-otp"
      containerClassName={cn(
        "flex items-center gap-(--spacing-mm-8) has-disabled:opacity-50",
        containerClassName,
      )}
      spellCheck={false}
      className={cn("disabled:cursor-not-allowed", className)}
      {...props}
    />
  )
}

function InputOTPGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(
        "flex items-center gap-(--spacing-mm-4)",
        className,
      )}
      {...props}
    />
  )
}

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number
}) {
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex size-9 items-center justify-center",
        "font-mono font-medium text-mm-tiny tracking-mm-label text-[var(--color-mm-fg)]",
        // Every slot carries a full 1px border + a gap (set on the group), so
        // borders never share an edge or double up. Active simply recolors its
        // OWN border to brand at the same 1px weight — no ring, no z-index
        // overlap, identical treatment on every slot.
        "border border-[var(--color-mm-border)] bg-transparent",
        "transition-colors outline-none",
        "aria-invalid:border-[var(--color-mm-pink)]",
        "data-[active=true]:border-[var(--color-mm-brand)]",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px bg-[var(--color-mm-fg)] animate-pulse" />
        </div>
      )}
    </div>
  )
}

function InputOTPSeparator(props: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      className="flex items-center text-[var(--color-mm-muted-soft)]"
      {...props}
    >
      <DashIcon className="size-(--size-mm-bracket)" />
    </div>
  )
}

function DashIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <path d="M3 6L9 6" stroke="currentColor" strokeWidth="1" strokeLinecap="square" />
    </svg>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
