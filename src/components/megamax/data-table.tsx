"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "@nsmr/pixelart-react"
import { cn } from "@/lib/utils"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

interface DataTableColumn<T> {
  key: keyof T & string
  label: string
  align?: "left" | "right"
  width?: string
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  data: T[]
  pageSize?: number
  noun?: string
  className?: string
}

function DataTable<T extends Record<string, any>>({
  columns,
  data,
  pageSize = 4,
  noun = "items",
  className,
}: DataTableProps<T>) {
  const [page, setPage] = React.useState(0)
  const totalPages = Math.ceil(data.length / pageSize)
  const pageData = data.slice(page * pageSize, (page + 1) * pageSize)

  return (
    <div
      data-slot="data-table"
      className={cn(
        "bg-[var(--color-mm-bg)] border border-[var(--color-mm-border)] overflow-hidden",
        className,
      )}
    >
      <Table>
        <colgroup>
          {columns.map((col) => (
            <col key={col.key} style={col.width ? { width: col.width } : undefined} />
          ))}
        </colgroup>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className={cn(
                  "font-mono text-mm-nano uppercase tracking-mm-label",
                  col.align === "right" && "text-right",
                )}
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageData.map((row, i) => (
            <TableRow key={page * pageSize + i}>
              {columns.map((col) => (
                <TableCell
                  key={col.key}
                  className={cn(col.align === "right" && "text-right")}
                >
                  {col.render
                    ? col.render(row[col.key], row)
                    : String(row[col.key] ?? "")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between px-(--spacing-mm-12) py-(--spacing-mm-8) border-t border-[var(--color-mm-border)]">
        <span className="font-mono text-mm-nano text-[var(--color-mm-muted-soft)]">
          {pageData.length} of {data.length} {noun}
        </span>
        <div className="flex items-center gap-(--spacing-mm-4) font-mono text-mm-nano text-[var(--color-mm-muted-soft)]">
          <button
            type="button"
            aria-label="Previous page"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="mm-pixel-icon size-(--size-mm-button-xs) inline-flex items-center justify-center border border-[var(--color-mm-border)] [&_svg]:size-(--size-mm-icon-sm) hover:border-[var(--color-mm-fg)]/20 hover:text-[var(--color-mm-fg)] disabled:opacity-30 cursor-pointer disabled:cursor-default transition-colors outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mm-brand)]"
          >
            <ChevronLeft />
          </button>
          <span className="px-(--spacing-mm-8) tabular-nums">
            {page + 1} / {totalPages}
          </span>
          <button
            type="button"
            aria-label="Next page"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="mm-pixel-icon size-(--size-mm-button-xs) inline-flex items-center justify-center border border-[var(--color-mm-border)] [&_svg]:size-(--size-mm-icon-sm) hover:border-[var(--color-mm-fg)]/20 hover:text-[var(--color-mm-fg)] disabled:opacity-30 cursor-pointer disabled:cursor-default transition-colors outline-none focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-mm-brand)]"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export { DataTable, type DataTableColumn }
