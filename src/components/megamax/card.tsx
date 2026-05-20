
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Card — Vol. 2 Brutalist
 *
 * Plain container with sharp edges, 1px border, mono typography. The
 * lighter-weight cousin of `HudFrame` — no corner brackets.
 *
 * Two sizes:
 *  - "md" (default): generous padding, mm-sm title
 *  - "sm":  compact padding, mm-tiny title
 *
 * Two variants:
 *  - "solid" (default): single flowing block, padding wraps every section
 *  - "split": header is a separate strip with a bottom border, then body
 */

const cardVariants = cva(
  "group/card flex flex-col w-full font-mono " +
  "bg-[var(--color-mm-bg)] border border-[var(--color-mm-border)] text-[var(--color-mm-fg)]",
  {
    variants: {
      variant: {
        // continuous padded block — gap between sections, footer flush at the bottom
        solid: "has-data-[slot=card-footer]:pb-0",
        // each section owns its own padding; header gets border-b
        split: "gap-0 py-0",
      },
      size: { sm: "", md: "" },
    },
    compoundVariants: [
      { variant: "solid", size: "md", class: "gap-(--spacing-mm-12) py-(--spacing-mm-12)" },
      { variant: "solid", size: "sm", class: "gap-(--spacing-mm-8) py-(--spacing-mm-8)" },
    ],
    defaultVariants: { variant: "solid", size: "md" },
  },
)

const cardHeaderVariants = cva(
  // grid with explicit row/column gaps so the action never crowds the title:
  //   gap-y (vertical) keeps description below title with rhythm
  //   gap-x (horizontal) gives the action breathing room from title text
  "grid auto-rows-min items-center gap-y-(--spacing-mm-6) gap-x-(--spacing-mm-16) " +
  "has-data-[slot=card-action]:grid-cols-[1fr_auto]",
  {
    variants: {
      size: {
        md: "px-(--spacing-mm-12)",
        sm: "px-(--spacing-mm-8)",
      },
      variant: {
        solid: "",
        split: "border-b border-[var(--color-mm-border)]",
      },
    },
    compoundVariants: [
      { variant: "split", size: "md", class: "py-(--spacing-mm-8)" },
      { variant: "split", size: "sm", class: "py-(--spacing-mm-6)" },
    ],
    defaultVariants: { variant: "solid", size: "md" },
  },
)

const cardTitleVariants = cva(
  "font-mono font-bold uppercase tracking-mm-title text-[var(--color-mm-fg)] whitespace-nowrap",
  {
    variants: {
      size: { md: "text-mm-sm", sm: "text-mm-tiny" },
    },
    defaultVariants: { size: "md" },
  },
)

const cardDescriptionVariants = cva(
  "font-mono font-normal tracking-mm-label text-[var(--color-mm-muted)] leading-(--leading-mm-normal)",
  {
    variants: {
      size: { md: "text-mm-tiny", sm: "text-mm-nano" },
    },
    defaultVariants: { size: "md" },
  },
)

const cardContentVariants = cva(
  "flex flex-col gap-(--spacing-mm-8)",
  {
    variants: {
      size: {
        md: "px-(--spacing-mm-12)",
        sm: "px-(--spacing-mm-8)",
      },
      variant: { solid: "", split: "" },
    },
    compoundVariants: [
      { variant: "split", size: "md", class: "py-(--spacing-mm-12)" },
      { variant: "split", size: "sm", class: "py-(--spacing-mm-8)" },
    ],
    defaultVariants: { variant: "solid", size: "md" },
  },
)

const cardFooterVariants = cva(
  "flex items-center w-full border-t border-[var(--color-mm-border)] bg-[var(--color-mm-surface)]/40",
  {
    variants: {
      size: {
        md: "px-(--spacing-mm-12) py-(--spacing-mm-8)",
        sm: "px-(--spacing-mm-8) py-(--spacing-mm-6)",
      },
    },
    defaultVariants: { size: "md" },
  },
)

const CardContext = React.createContext<Required<VariantProps<typeof cardVariants>>>({
  variant: "solid",
  size: "md",
})
const useCardCtx = () => React.useContext(CardContext)

function Card({
  className,
  variant = "solid",
  size = "md",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <CardContext.Provider value={{ variant: variant ?? "solid", size: size ?? "md" }}>
      <div
        data-slot="card"
        data-size={size}
        data-variant={variant}
        className={cn(cardVariants({ variant, size }), className)}
        {...props}
      />
    </CardContext.Provider>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  const ctx = useCardCtx()
  return (
    <div
      data-slot="card-header"
      className={cn(cardHeaderVariants(ctx), className)}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"p">) {
  const { size } = useCardCtx()
  return (
    <p
      data-slot="card-title"
      className={cn(cardTitleVariants({ size }), className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { size } = useCardCtx()
  return (
    <p
      data-slot="card-description"
      className={cn(cardDescriptionVariants({ size }), className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-start-1 self-center justify-self-end", className)}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  const ctx = useCardCtx()
  return (
    <div
      data-slot="card-content"
      className={cn(cardContentVariants(ctx), className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  const { size } = useCardCtx()
  return (
    <div
      data-slot="card-footer"
      className={cn(cardFooterVariants({ size }), className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
  cardVariants,
}
