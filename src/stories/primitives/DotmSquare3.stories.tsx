import type { Meta, StoryObj } from "@storybook/react-vite"
import { DotmSquare3 } from "@/components/megamax/dotm-square-3"

const meta: Meta<typeof DotmSquare3> = {
  title: "Primitives/DotmSquare3",
  component: DotmSquare3,
  parameters: { layout: "centered" },
  argTypes: {
    size:    { control: { type: "range", min: 16, max: 96, step: 4 } },
    dotSize: { control: { type: "range", min: 2, max: 12, step: 1 } },
    speed:   { control: { type: "range", min: 0.25, max: 3, step: 0.05 } },
    pattern: {
      control: "select",
      options: ["full", "diamond", "outline", "rose", "cross", "rings"],
    },
    dotShape: {
      control: "select",
      options: ["circle", "square", "diamond", "hearts"],
    },
    colorPreset: {
      control: "select",
      options: [
        undefined,
        "solid-theme",
        "solid-mint",
        "grad-sunset",
        "grad-ocean",
        "grad-neon",
        "grad-aurora",
        "grad-fire",
        "grad-prism",
      ],
    },
    animated:      { control: "boolean" },
    hoverAnimated: { control: "boolean" },
    bloom:         { control: "boolean" },
    halo:          { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    color:         { control: "color" },
  },
}

export default meta
type Story = StoryObj<typeof DotmSquare3>

export const Default: Story = {
  args: { animated: true },
}

export const Bloom: Story = {
  args: { animated: true, bloom: true, size: 56, dotSize: 7 },
}

export const HoverActivated: Story = {
  args: { animated: false, hoverAnimated: true, size: 56, dotSize: 7 },
}

/**
 * Brutalist fit — `dotShape="square"` + no bloom + theme color = mono pixel
 * grid, the v2-native variant. Reach for this before the rounded/gradient ones.
 */
export const BrutalistSquare: Story = {
  name: "Brutalist · square dots",
  args: {
    animated: true,
    dotShape: "square",
    colorPreset: "solid-theme",
    size: 48,
    dotSize: 6,
    bloom: false,
    halo: 0,
  },
}

export const GradAurora: Story = {
  args: { animated: true, colorPreset: "grad-aurora", bloom: true, size: 56, dotSize: 7 },
}

export const Patterns: Story = {
  name: "Patterns · grid",
  render: () => (
    <div className="grid grid-cols-3 gap-(--spacing-mm-16) p-(--spacing-mm-16) bg-[var(--color-mm-bg)]">
      {(["full", "diamond", "outline", "rose", "cross", "rings"] as const).map((p) => (
        <div key={p} className="flex flex-col items-center gap-(--spacing-mm-8)">
          <DotmSquare3 pattern={p} size={48} dotSize={6} />
          <span className="font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted)]">
            {p}
          </span>
        </div>
      ))}
    </div>
  ),
}

export const ColorPresets: Story = {
  name: "Color presets · grid",
  render: () => (
    <div className="grid grid-cols-4 gap-(--spacing-mm-16) p-(--spacing-mm-16) bg-[var(--color-mm-bg)]">
      {(
        [
          "solid-theme",
          "solid-mint",
          "grad-sunset",
          "grad-ocean",
          "grad-neon",
          "grad-aurora",
          "grad-fire",
          "grad-prism",
        ] as const
      ).map((preset) => (
        <div key={preset} className="flex flex-col items-center gap-(--spacing-mm-8)">
          <DotmSquare3 colorPreset={preset} bloom size={48} dotSize={6} />
          <span className="font-mono text-mm-nano uppercase tracking-mm-label text-[var(--color-mm-muted)]">
            {preset}
          </span>
        </div>
      ))}
    </div>
  ),
}
