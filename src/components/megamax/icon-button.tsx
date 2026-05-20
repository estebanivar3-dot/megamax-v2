
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * IconButton — Vol. 2 Brutalist
 *
 * Square button (--size-mm-button × --size-mm-button) that holds a single
 * icon. Use for toolbar actions, close/clear, navigation chevrons — any
 * action where the icon is the affordance and no text is needed.
 *
 *   - "blue":  filled brand bg + on-brand text (primary action)
 *   - "dark":  bg-bg + 1px border + muted text (secondary action)
 *   - "ghost": transparent + muted text, hovers to surface (toolbar action)
 *
 * Pass a `@nsmr/pixelart-react` icon as child for the v2 pixel-art look:
 * `<IconButton aria-label="Close"><Close /></IconButton>`. Lucide icons work
 * too if a pixelarticons equivalent doesn't exist.
 *
 * Child SVGs are auto-sized to 16px and rendered with `shape-rendering:
 * crispEdges` so pixel-art paths stay sharp at sub-native scales.
 */

const iconButtonVariants = cva(
  "mm-pixel-icon inline-flex items-center justify-center shrink-0 " +
  "[&_svg]:shrink-0 " +
  "cursor-pointer transition-colors " +
  "outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mm-brand)]",
  {
    variants: {
      color: {
        blue:  "bg-[var(--color-mm-brand)] text-[var(--color-mm-on-brand)] hover:bg-[var(--color-mm-brand-hover)]",
        dark:  "bg-[var(--color-mm-bg)] border border-[var(--color-mm-border)] text-[var(--color-mm-muted)] hover:text-[var(--color-mm-fg)]",
        ghost: "bg-transparent text-[var(--color-mm-muted)] hover:text-[var(--color-mm-fg)] hover:bg-[var(--color-mm-surface)]",
      },
      // Sizes match Figma 197:505: Sm 32 / Md 40 / Lg 48. `xs` is a smaller
      // 24px used inside PromptBox and toolbars where 32 would crowd.
      // Outer + padding + icon all scale together via the `--size-mm-button-*`
      // and `--size-mm-icon-*` token scales so proportions hold in magnify.
      size: {
        xs: "size-(--size-mm-button-xs) p-(--spacing-mm-4) [&_svg]:size-(--size-mm-icon-sm)",
        sm: "size-(--size-mm-button-sm) p-(--spacing-mm-8) [&_svg]:size-(--size-mm-icon-md)",
        md: "size-(--size-mm-button-md) p-(--spacing-mm-12) [&_svg]:size-(--size-mm-icon-md)",
        lg: "size-(--size-mm-button-lg) p-(--spacing-mm-12) [&_svg]:size-(--size-mm-icon-xl)",
      },
    },
    defaultVariants: { color: "dark", size: "md" },
  },
)

interface IconButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof iconButtonVariants> {
  /** Accessible label — required since the icon alone doesn't announce. */
  "aria-label": string
}

function IconButton({ className, color, size, children, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      data-slot="icon-button"
      data-color={color ?? "dark"}
      data-size={size ?? "md"}
      className={cn(iconButtonVariants({ color, size }), className)}
      {...props}
    >
      {children}
    </button>
  )
}

export { IconButton, iconButtonVariants, type IconButtonProps }
