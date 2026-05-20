import { addons } from "storybook/manager-api"
import * as React from "react"
import { NEW_COMPONENTS } from "./new-components"

/**
 * Sidebar decorator that paints a "NEW" badge next to story group titles
 * which appear in `new-components.ts`.
 *
 * Implementation note: Storybook 10's `sidebar.renderLabel` is called once
 * per sidebar entry with `{ name, type }`. The `name` is the leaf segment of
 * the title path (e.g. "Slider" for "Primitives/Slider"). We can't match on
 * the full path from `renderLabel` alone, so we cache a Set of leaf names
 * derived from NEW_COMPONENTS — sufficient because all entries here are
 * uniquely named within the library.
 */

const NEW_LEAVES = new Set(
  NEW_COMPONENTS.map((path) => path.split("/").pop()!.trim().toLowerCase()),
)

const NewBadge = () => (
  <span
    aria-label="New — pending review"
    title="New — pending review"
    style={{
      display: "inline-block",
      marginLeft: 6,
      padding: "0 4px",
      fontSize: 8,
      fontWeight: 700,
      letterSpacing: 0.5,
      lineHeight: "12px",
      textTransform: "uppercase",
      color: "#0a0a0a",
      background: "#47a5c6",
      verticalAlign: "middle",
    }}
  >
    NEW
  </span>
)

addons.setConfig({
  sidebar: {
    renderLabel: (item: { name: string; type: string }) => {
      const showBadge =
        (item.type === "component" || item.type === "group") &&
        NEW_LEAVES.has(item.name.trim().toLowerCase())

      if (!showBadge) return item.name
      return (
        <span style={{ display: "inline-flex", alignItems: "center" }}>
          {item.name}
          <NewBadge />
        </span>
      )
    },
  },
})
