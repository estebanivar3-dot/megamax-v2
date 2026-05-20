import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  HudInput,
  HudInputGroup,
  HudInputHeader,
  HudInputLabel,
  HudInputStatus,
} from "@/components/megamax/hud-input"

const meta: Meta<typeof HudInput> = {
  title: "Primitives/HudInput",
  component: HudInput,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof HudInput>

export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[500px]">
      <HudInputGroup>
        <HudInputHeader>
          <HudInputLabel>[PROJECT_NAME]</HudInputLabel>
          <HudInputStatus activeChildren="EDITING">STRING</HudInputStatus>
        </HudInputHeader>
        <HudInput placeholder="NULL" />
      </HudInputGroup>

      <HudInputGroup>
        <HudInputHeader>
          <HudInputLabel>[API_ENDPOINT]</HudInputLabel>
          <HudInputStatus activeChildren="EDITING">URL</HudInputStatus>
        </HudInputHeader>
        <HudInput defaultValue="https://api.megamax.dev" />
      </HudInputGroup>

      <HudInputGroup>
        <HudInputHeader>
          <HudInputLabel>[SECRET_KEY]</HudInputLabel>
          <HudInputStatus activeChildren="EDITING">NULL</HudInputStatus>
        </HudInputHeader>
        <HudInput placeholder="NULL" type="password" />
      </HudInputGroup>
    </div>
  ),
}

export const FormExample: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-[500px]">
      <HudInputGroup>
        <HudInputHeader>
          <HudInputLabel htmlFor="host">[HOST]</HudInputLabel>
          <HudInputStatus activeChildren="EDITING">STRING</HudInputStatus>
        </HudInputHeader>
        <HudInput id="host" defaultValue="localhost" />
      </HudInputGroup>

      <HudInputGroup>
        <HudInputHeader>
          <HudInputLabel htmlFor="port">[PORT]</HudInputLabel>
          <HudInputStatus activeChildren="EDITING">NUMBER</HudInputStatus>
        </HudInputHeader>
        <HudInput id="port" defaultValue="6011" type="number" />
      </HudInputGroup>

      <HudInputGroup>
        <HudInputHeader>
          <HudInputLabel htmlFor="env">[ENVIRONMENT]</HudInputLabel>
          <HudInputStatus activeChildren="EDITING">ENUM</HudInputStatus>
        </HudInputHeader>
        <HudInput id="env" defaultValue="development" />
      </HudInputGroup>
    </div>
  ),
}
