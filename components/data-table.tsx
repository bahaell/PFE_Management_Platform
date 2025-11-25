import React from 'react'
import { cn } from '@/lib/utils'

interface DataTableColumn<T> {
  id?: string
  header: string
  accessor: keyof T
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[]
  data: T[]
  onRowClick?: (row: T) => void
}

export function DataTable<T extends { id: string | number }>({ columns, data, onRowClick }: DataTableProps<T>) {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-secondary border-b border-border">
            <tr>
              {columns.map((column) => (
                <th key={column.id || String(column.accessor)} className="px-4 sm:px-6 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-foreground">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className={cn('hover:bg-secondary transition-colors', onRowClick && 'cursor-pointer')}
              >
                {columns.map((column) => (
                  <td key={column.id || String(column.accessor)} className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-foreground">
                    {column.render ? column.render(row[column.accessor], row) : String(row[column.accessor])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length === 0 && (
        <div className="text-center py-8 sm:py-12">
          <p className="text-sm sm:text-base text-muted-foreground">No data available</p>
        </div>
      )}
    </div>
  )
}
