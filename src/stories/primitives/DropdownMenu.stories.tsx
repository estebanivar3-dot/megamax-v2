import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import {
  User,
  Card,
  Sliders,
  Keyboard,
  UserPlus,
  Mail,
  Message,
  Plus,
  Logout,
} from "@nsmr/pixelart-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/megamax/button"

const meta: Meta = {
  title: "Primitives/DropdownMenu",
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj

/**
 * Full account menu — Label header, two grouped sections, a sub-menu,
 * keyboard shortcuts, and a destructive Log out item. Icons + shortcuts
 * are passed via slot props (`icon` / `trailing`) so MenuListItem's layout
 * sizes them consistently.
 */
export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button color="dark">OPEN MENU</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>my account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem icon={<User />} trailing={<DropdownMenuShortcut>⇧ p</DropdownMenuShortcut>}>
            profile
          </DropdownMenuItem>
          <DropdownMenuItem icon={<Card />} trailing={<DropdownMenuShortcut>⌘ b</DropdownMenuShortcut>}>
            billing
          </DropdownMenuItem>
          <DropdownMenuItem icon={<Sliders />} trailing={<DropdownMenuShortcut>⌘ s</DropdownMenuShortcut>}>
            settings
          </DropdownMenuItem>
          <DropdownMenuItem icon={<Keyboard />} trailing={<DropdownMenuShortcut>⌘ k</DropdownMenuShortcut>}>
            shortcuts
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger icon={<UserPlus />}>invite users</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem icon={<Mail />}>email</DropdownMenuItem>
              <DropdownMenuItem icon={<Message />}>message</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem icon={<Plus />}>more…</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" icon={<Logout />} trailing={<DropdownMenuShortcut>⌘ q</DropdownMenuShortcut>}>
          log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

/**
 * Checkbox items — multi-select view options. Cyan 6px square trails on the
 * right when checked. Menu stays open across toggles.
 */
export const Checkboxes: Story = {
  render: function Checkboxes() {
    const [showStatus, setShowStatus] = useState(true)
    const [showTags, setShowTags] = useState(false)
    const [showTimestamps, setShowTimestamps] = useState(true)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button color="dark">VIEW OPTIONS</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem checked={showStatus} onCheckedChange={setShowStatus}>
            status
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showTags} onCheckedChange={setShowTags}>
            tags
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={showTimestamps} onCheckedChange={setShowTimestamps}>
            timestamps
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

/**
 * Radio items — single-select grouping with the cyan square indicator on
 * the selected row.
 */
export const Radios: Story = {
  render: function Radios() {
    const [density, setDensity] = useState("comfortable")
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button color="dark">DENSITY: {density.toUpperCase()}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>row density</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={density} onValueChange={setDensity}>
            <DropdownMenuRadioItem value="compact">compact</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="comfortable">comfortable</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="spacious">spacious</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

/**
 * Overflow — long filter list that exceeds the content height. Pass
 * `maxHeight` to `DropdownMenuContent` to enable vertical scrolling.
 */
export const Overflow: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button color="dark">PICK A FILTER</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent maxHeight={200}>
        <DropdownMenuLabel>dither filters</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {Array.from({ length: 20 }, (_, i) => (
          <DropdownMenuItem key={i}>filter option {String(i + 1).padStart(2, "0")}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
