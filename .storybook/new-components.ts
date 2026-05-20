/**
 * Single source of truth for which Storybook entries get a "NEW" badge in
 * the sidebar. Add a story title (or a Storybook story ID prefix) here when
 * you ship a new component; remove it once Esteban has reviewed and signed
 * off.
 *
 * Matching is by **title prefix** (case-insensitive). So:
 *   "Primitives/Slider"   matches Primitives/Slider and all its stories
 *   "Examples/09 · WYRM"  matches Examples/09 · WYRM Inspector + children
 *
 * `.storybook/manager.tsx` reads this list and decorates the sidebar.
 */
export const NEW_COMPONENTS: string[] = [
  // Atoms
  "Primitives/Slider",
  "Primitives/NumericValue",
  "Primitives/Kbd",
  "Primitives/Indicator",
  "Primitives/DropdownPill",
  "Primitives/Segment (ToggleButton)",
  "Primitives/MenuListItem",
  // Composites (rows + inputs)
  "Primitives/ShortcutHints",
  "Primitives/PromptBox",
  "Primitives/FieldRow",
  "Primitives/ToggleRow",
  "Primitives/SliderRow",
  // Chrome + nav
  "Primitives/SectionHeader",
  "Primitives/TitleBar",
  "Primitives/Sidebar",
  // Composition examples
  "Examples/09 · WYRM Inspector",
  "Examples/10 · Chat Browser",
]
