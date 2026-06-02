import * as React from "react"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"
import { ChevronRight } from "@nsmr/pixelart-react"

import { cn } from "@/lib/utils"
import { MenuListItem, MenuListSeparator } from "@/components/megamax/menu-list-item"
import { ScrollArea } from "@/components/megamax/scroll-area"

/**
 * DropdownMenu — Vol. 2 Brutalist
 *
 * Shadcn-style Radix wrappers. Each item-shaped primitive `asChild`'s into
 * `<MenuListItem>` so the visual lives in exactly one place. The Radix
 * `data-highlighted` / `data-disabled` attrs drive the same surface-hover
 * and opacity-40 treatments that MenuListItem applies via `:hover` and
 * `:disabled`.
 *
 * API matches MenuListItem: pass label as `children`, icon via `icon`,
 * shortcut / indicator via `trailing`. The legacy "blob children" pattern
 * (svg + text + shortcut all as siblings) still works because MenuListItem's
 * default layout wraps children in a flex-1 span — but slot props are
 * preferred for new code.
 *
 * Includes: Content, Group, Label, Item, CheckboxItem, RadioItem,
 * Separator, Shortcut, Sub-menu. CheckboxItem keeps the menu open across
 * toggles.
 */

const SELECTED_INDICATOR = (
  <DropdownMenuPrimitive.ItemIndicator>
    <span className="block size-(--size-mm-dot) bg-[var(--color-mm-cyan)] shrink-0" aria-hidden />
  </DropdownMenuPrimitive.ItemIndicator>
)

function DropdownMenu(props: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuTrigger(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>,
) {
  return <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />
}

function DropdownMenuPortal(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>,
) {
  return <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
}

function DropdownMenuGroup(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Group>,
) {
  return <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
}

function DropdownMenuContent({
  className,
  align = "start",
  sideOffset = 6,
  maxHeight,
  style,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content> & { maxHeight?: number | string }) {
  const maxH = maxHeight !== undefined
    ? (typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight)
    : undefined
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        align={align}
        className={cn(
          "z-50 min-w-[180px] outline-none flex flex-col",
          "bg-[var(--color-mm-bg)] border border-[var(--color-mm-border)]",
          "shadow-[var(--shadow-mm-label-strong)] font-mono",
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
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & { inset?: boolean }) {
  return (
    <DropdownMenuPrimitive.Label asChild {...props}>
      <MenuListItem
        variant="label"
        data-slot="dropdown-menu-label"
        data-inset={inset}
        className={cn(inset && "pl-(--spacing-mm-16)", className)}
      >
        {children}
      </MenuListItem>
    </DropdownMenuPrimitive.Label>
  )
}

interface DropdownMenuItemProps
  extends React.ComponentProps<typeof DropdownMenuPrimitive.Item> {
  inset?: boolean
  variant?: "default" | "destructive"
  icon?: React.ReactNode
  trailing?: React.ReactNode
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  icon,
  trailing,
  children,
  ...props
}: DropdownMenuItemProps) {
  return (
    <DropdownMenuPrimitive.Item asChild {...props}>
      <MenuListItem
        variant={variant}
        icon={icon}
        trailing={trailing}
        data-slot="dropdown-menu-item"
        data-inset={inset}
        className={cn(inset && "pl-(--spacing-mm-16)", className)}
      >
        {children}
      </MenuListItem>
    </DropdownMenuPrimitive.Item>
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  onSelect,
  icon,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem> & { icon?: React.ReactNode }) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      asChild
      checked={checked}
      // Keep menu open across toggles — multi-select pattern.
      onSelect={(e) => {
        e.preventDefault()
        onSelect?.(e)
      }}
      {...props}
    >
      <MenuListItem
        role="menuitemcheckbox"
        icon={icon}
        trailing={SELECTED_INDICATOR}
        data-slot="dropdown-menu-checkbox-item"
        className={className}
      >
        {children}
      </MenuListItem>
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>,
) {
  return (
    <DropdownMenuPrimitive.RadioGroup data-slot="dropdown-menu-radio-group" {...props} />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  icon,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem> & { icon?: React.ReactNode }) {
  return (
    <DropdownMenuPrimitive.RadioItem asChild {...props}>
      <MenuListItem
        role="menuitemradio"
        icon={icon}
        trailing={SELECTED_INDICATOR}
        data-slot="dropdown-menu-radio-item"
        className={className}
      >
        {children}
      </MenuListItem>
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator asChild {...props}>
      <MenuListSeparator data-slot="dropdown-menu-separator" className={className} />
    </DropdownMenuPrimitive.Separator>
  )
}

function DropdownMenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto font-mono font-normal text-mm-nano leading-none tracking-mm-label uppercase",
        "text-[var(--color-mm-muted-soft)]",
        className,
      )}
      {...props}
    />
  )
}

function DropdownMenuSub(
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>,
) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  icon,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & { inset?: boolean; icon?: React.ReactNode }) {
  return (
    <DropdownMenuPrimitive.SubTrigger asChild {...props}>
      <MenuListItem
        icon={icon}
        trailing={<ChevronRight className="shrink-0" />}
        data-slot="dropdown-menu-sub-trigger"
        data-inset={inset}
        className={cn(inset && "pl-(--spacing-mm-16)", className)}
      >
        {children}
      </MenuListItem>
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  maxHeight,
  style,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent> & { maxHeight?: number | string }) {
  const maxH = maxHeight !== undefined
    ? (typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight)
    : undefined
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.SubContent
        data-slot="dropdown-menu-sub-content"
        className={cn(
          "z-50 min-w-[160px] outline-none flex flex-col",
          "bg-[var(--color-mm-bg)] border border-[var(--color-mm-border)]",
          "shadow-[var(--shadow-mm-label-strong)] font-mono",
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
      </DropdownMenuPrimitive.SubContent>
    </DropdownMenuPrimitive.Portal>
  )
}

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}
