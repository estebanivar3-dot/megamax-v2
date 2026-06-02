import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ScrollArea } from "./scroll-area"

/**
 * MenuListItem — Vol. 2 Brutalist
 *
 * Canonical row primitive for any dropdown / popover list — including the
 * shadcn `DropdownMenu` wrappers, which `asChild` into this component so
 * the visual stays in one place.
 *
 * Variants:
 *  - variant — `default` / `label` (non-interactive muted-soft header) /
 *    `destructive` (pink-tinted action like "Delete" / "Log out")
 *  - size — sm (default) / md / lg
 *  - selected — brand-cyan text accent for the active value (no effect on
 *    label)
 *
 * Slots:
 *  - icon — leading 12/16/20px pixelart icon
 *  - trailing — right-side affordance (cyan square indicator, kbd shortcut,
 *    count badge)
 *
 * Highlighted state — responds to BOTH `:hover` (mouse) AND `[data-highlighted]`
 * (Radix keyboard focus, when this is used inside a Radix `asChild`). Disabled
 * responds to both `:disabled` and `[data-disabled]` for the same reason.
 *
 * Compose with the helpers:
 *  - `MenuList` — bordered container, stacks items, optional `maxHeight` for
 *    scrollable overflow
 *  - `MenuListSeparator` — 1px divider
 */

const menuListItemVariants = cva(
  "mm-pixel-icon group relative flex items-center w-full gap-(--spacing-mm-8) " +
  "font-mono font-normal leading-none tracking-mm-label uppercase whitespace-nowrap " +
  "bg-[var(--color-mm-bg)] transition-colors " +
  "[&_svg]:shrink-0 [&_svg]:[shape-rendering:crispEdges]",
  {
    variants: {
      size: {
        sm: "px-(--spacing-mm-8)  py-(--spacing-mm-6)  text-mm-nano  [&_svg]:size-(--size-mm-icon-sm)",
        md: "px-(--spacing-mm-12) py-(--spacing-mm-8)  text-mm-tiny  [&_svg]:size-(--size-mm-icon-md)",
        lg: "px-(--spacing-mm-16) py-(--spacing-mm-12) text-mm-tiny  [&_svg]:size-(--size-mm-icon-lg)",
      },
      variant: {
        default:
          "text-[var(--color-mm-fg)] " +
          "cursor-pointer outline-none " +
          "hover:bg-[var(--color-mm-surface)] focus-visible:bg-[var(--color-mm-surface)] " +
          "data-highlighted:bg-[var(--color-mm-surface)] " +
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none " +
          "data-disabled:opacity-40 data-disabled:cursor-not-allowed data-disabled:pointer-events-none",
        label:
          "text-[var(--color-mm-muted-soft)] select-none cursor-default",
        destructive:
          "text-[var(--color-mm-pink)] " +
          "cursor-pointer outline-none " +
          "hover:bg-[var(--color-mm-pink-fill)] focus-visible:bg-[var(--color-mm-pink-fill)] " +
          "data-highlighted:bg-[var(--color-mm-pink-fill)] " +
          "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none " +
          "data-disabled:opacity-40 data-disabled:cursor-not-allowed data-disabled:pointer-events-none",
      },
      selected: {
        true:  "text-[var(--color-mm-brand)]",
        false: "",
      },
    },
    compoundVariants: [
      // Selected wins over default text color, but never overrides label/destructive.
      { variant: "default", selected: true,  class: "text-[var(--color-mm-brand)]" },
    ],
    defaultVariants: { size: "sm", variant: "default", selected: false },
  },
)

type MenuListItemBaseProps = VariantProps<typeof menuListItemVariants> & {
  icon?: React.ReactNode
  /** Trailing slot — selected indicator, kbd shortcut, count badge. */
  trailing?: React.ReactNode
  /** When true, the leading/trailing/children layout is skipped and children
   *  render directly. Use when wrapping arbitrary blob content (e.g. for
   *  composition with another primitive that owns the inner layout). */
  raw?: boolean
  className?: string
  children?: React.ReactNode
}

type MenuListItemProps =
  | (MenuListItemBaseProps & { variant?: "default" | "destructive" } & Omit<React.ComponentProps<"button">, keyof MenuListItemBaseProps>)
  | (MenuListItemBaseProps & { variant: "label" } & Omit<React.ComponentProps<"div">, keyof MenuListItemBaseProps>)

function MenuListItem({
  className,
  size,
  variant,
  selected,
  icon,
  trailing,
  raw = false,
  children,
  ...props
}: MenuListItemProps) {
  const resolvedVariant = variant ?? "default"
  const classes = cn(menuListItemVariants({ size, variant: resolvedVariant, selected }), className)

  const content = raw ? children : (
    <>
      {icon}
      <span className="flex-1 text-left truncate">{children}</span>
      {trailing}
    </>
  )

  if (resolvedVariant === "label") {
    return (
      <div
        role="presentation"
        data-slot="menu-list-item"
        data-variant="label"
        data-size={size ?? "sm"}
        className={classes}
        {...(props as React.ComponentProps<"div">)}
      >
        {content}
      </div>
    )
  }

  return (
    <button
      type="button"
      role="menuitem"
      data-slot="menu-list-item"
      data-variant={resolvedVariant}
      data-size={size ?? "sm"}
      data-selected={selected}
      className={classes}
      {...(props as React.ComponentProps<"button">)}
    >
      {content}
    </button>
  )
}

/**
 * MenuList — bordered container that stacks `<MenuListItem>` children.
 *
 * Pass `maxHeight` (px or any CSS length) to enable vertical scrolling for
 * long lists. Without it the list grows to its content height.
 */
function MenuList({
  className,
  children,
  maxHeight,
  style,
  ...props
}: React.ComponentProps<"div"> & { maxHeight?: number | string }) {
  const maxH = maxHeight !== undefined
    ? (typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight)
    : undefined
  return (
    <div
      data-slot="menu-list"
      role="menu"
      className={cn(
        "flex flex-col w-full border border-[var(--color-mm-border)] bg-[var(--color-mm-bg)]",
        className,
      )}
      style={style}
      {...props}
    >
      {maxH !== undefined ? (
        <ScrollArea maxHeight={maxH}>{children}</ScrollArea>
      ) : (
        children
      )}
    </div>
  )
}

/** Thin horizontal divider between groups inside a `MenuList`. */
function MenuListSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="menu-list-separator"
      role="separator"
      aria-orientation="horizontal"
      className={cn("h-px w-full bg-[var(--color-mm-border)] shrink-0", className)}
      {...props}
    />
  )
}

export {
  MenuListItem,
  MenuList,
  MenuListSeparator,
  menuListItemVariants,
  type MenuListItemProps,
}
