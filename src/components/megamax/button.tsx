
import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Button — Vol. 2 Brutalist (Component 1 in Figma, 40:1605)
 *
 * 8 variants from the Figma set: Type ∈ {Default, Split} × SubType ∈
 * {Icon, Text, Dot, —} × Color ∈ {Blue, Dark}.
 *
 * - color="blue": filled brand cyan bg + near-black text. Used for primary actions
 *   (PROMOTE TO WIKI, APPROVE).
 * - color="dark": #171717 bg + 1px border + muted text. Used for outline/secondary
 *   actions (BACK, CANCEL).
 *
 * For "split" mode, render `<Button.Action>` + `<Button.Extra>` siblings (or use the
 * `extra` prop for a quick shorthand).
 */

type ButtonColor = "blue" | "dark"
type ButtonSubType = "text" | "icon" | "dot" | "none"

interface ButtonRootProps extends React.ComponentProps<"div"> {
  color?: ButtonColor
}

function ButtonGroup({ className, color = "blue", ...props }: ButtonRootProps) {
  return (
    <div
      data-slot="button-group"
      data-color={color}
      className={cn(
        // `group` so children share a single hover state — hovering either
        // half lights up both at once instead of each independently.
        "group inline-flex items-stretch overflow-clip cursor-pointer",
        className,
      )}
      {...props}
    />
  )
}

interface ButtonActionProps extends React.ComponentProps<"button"> {
  color?: ButtonColor
  subType?: ButtonSubType
}

/**
 * Single-button action. For solo buttons, use `<Button>` (alias for ButtonAction with
 * outer wrapper handled inline).
 */
function ButtonAction({
  className,
  color = "blue",
  subType = "text",
  children,
  ...props
}: ButtonActionProps) {
  const isDark = color === "dark"
  return (
    <button
      type="button"
      data-slot="button-action"
      data-color={color}
      data-sub-type={subType}
      className={cn(
        // local `group` (for the dot/icon when used solo) + `group-hover:` (for
        // when wrapped in a ButtonGroup so both halves light together)
        "group inline-flex items-center justify-center gap-(--spacing-mm-6) px-(--spacing-mm-12) h-(--size-mm-button)",
        "font-mono font-semibold text-mm-tiny leading-none tracking-mm-button text-center whitespace-nowrap",
        "cursor-pointer transition-colors",
        "outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mm-brand)]",
        isDark
          ? "bg-[var(--color-mm-bg)] border border-[var(--color-mm-border)] text-[var(--color-mm-muted)] hover:text-[var(--color-mm-fg)] group-hover:text-[var(--color-mm-fg)]"
          : "bg-[var(--color-mm-brand)] text-[var(--color-mm-on-brand)] hover:bg-[var(--color-mm-brand-hover)] group-hover:bg-[var(--color-mm-brand-hover)]",
        className,
      )}
      {...props}
    >
      {subType === "dot" && (
        <span
          aria-hidden
          className={cn(
            "size-(--size-mm-dot-sm) shrink-0 transition-colors",
            isDark
              ? "bg-[var(--color-mm-muted)] group-hover:bg-[var(--color-mm-fg)]"
              : "bg-[var(--color-mm-on-brand)]",
          )}
        />
      )}
      {children}
    </button>
  )
}

interface ButtonExtraProps extends React.ComponentProps<"button"> {
  color?: ButtonColor
}

function ButtonExtra({ className, color = "blue", children, ...props }: ButtonExtraProps) {
  const isDark = color === "dark"
  return (
    <button
      type="button"
      data-slot="button-extra"
      data-color={color}
      className={cn(
        "inline-flex flex-col items-center justify-center",
        "px-(--spacing-mm-12) h-(--size-mm-button)",
        "font-mono font-semibold text-mm-nano leading-none tracking-mm-kbd text-center whitespace-nowrap",
        "cursor-pointer transition-colors",
        "outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mm-brand)]",
        isDark
          ? "bg-[var(--color-mm-bg)] border-y border-r border-[var(--color-mm-border)] text-[var(--color-mm-muted-soft)] hover:text-[var(--color-mm-fg)] group-hover:text-[var(--color-mm-fg)]"
          : "bg-[var(--color-mm-brand-soft)] text-[var(--color-mm-on-brand-soft)] hover:bg-[var(--color-mm-brand-soft-hover)] group-hover:bg-[var(--color-mm-brand-soft-hover)]",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

/**
 * Solo `<Button>` shorthand — wraps ButtonAction without ButtonGroup. Use the
 * compound `<ButtonGroup><ButtonAction /><ButtonExtra /></ButtonGroup>` for split buttons.
 */
function Button(props: ButtonActionProps) {
  return <ButtonAction {...props} />
}

export { Button, ButtonGroup, ButtonAction, ButtonExtra, type ButtonColor, type ButtonSubType }
