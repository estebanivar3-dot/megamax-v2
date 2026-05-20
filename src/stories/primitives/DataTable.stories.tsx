import type { Meta, StoryObj } from "@storybook/react-vite"
import { DataTable, type DataTableColumn } from "@/components/megamax/data-table"

const meta: Meta<typeof DataTable> = {
  title: "Primitives/DataTable",
  component: DataTable,
  parameters: { layout: "centered" },
}

export default meta
type Story = StoryObj<typeof DataTable>

interface Track {
  title: string
  artist: string
  discovered: string
  score: number
}

const columns: DataTableColumn<Track>[] = [
  {
    key: "title",
    label: "Track",
    width: "40%",
    render: (v) => (
      <span className="font-mono font-bold text-sm">{String(v)}</span>
    ),
  },
  {
    key: "artist",
    label: "Artist",
    width: "25%",
    render: (v) => (
      <span className="font-mono text-xs text-[var(--color-mm-muted-soft)]">{String(v)}</span>
    ),
  },
  {
    key: "discovered",
    label: "Discovered",
    width: "25%",
    render: (v) => (
      <span className="font-mono text-xs text-[var(--color-mm-muted-soft)]">{String(v)}</span>
    ),
  },
  {
    key: "score",
    label: "Score",
    width: "10%",
    align: "right",
    render: (v) => (
      <span className="font-mono font-bold text-[var(--color-mm-brand)]">{String(v)}</span>
    ),
  },
]

const tracks: Track[] = [
  { title: "Dragging a Dead Deer", artist: "Grouper", discovered: "2026-03-29", score: 94 },
  { title: "A Sun That Never Sets", artist: "Neurosis", discovered: "2026-03-28", score: 91 },
  { title: "Monoliths & Dimensions", artist: "Barn Owl", discovered: "2026-03-28", score: 87 },
  { title: "Black One", artist: "Sunn O)))", discovered: "2026-03-27", score: 82 },
  { title: "Ephemeral Drift", artist: "Huerco S.", discovered: "2026-03-26", score: 79 },
  { title: "Parallel Juno", artist: "Boards of Canada", discovered: "2026-03-25", score: 76 },
  { title: "Night Swim", artist: "Burial", discovered: "2026-03-24", score: 74 },
  { title: "Fracture Point", artist: "Autechre", discovered: "2026-03-23", score: 71 },
  { title: "Kozzmozz", artist: "Aphex Twin", discovered: "2026-03-22", score: 69 },
  { title: "Untitled #3", artist: "Gas", discovered: "2026-03-21", score: 67 },
  { title: "Silver Rain Fell", artist: "Fennesz", discovered: "2026-03-20", score: 64 },
  { title: "Pop Ambient 2026", artist: "Various", discovered: "2026-03-19", score: 61 },
]

export const Default: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={tracks}
      pageSize={4}
      noun="tracks"
      className="w-[700px]"
    />
  ),
}

export const ThreePerPage: Story = {
  render: () => (
    <DataTable
      columns={columns}
      data={tracks}
      pageSize={3}
      noun="tracks"
      className="w-[700px]"
    />
  ),
}
