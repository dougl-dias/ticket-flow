'use client'

import { type ReactNode, useMemo, useState } from 'react'

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Columns3Icon,
  MoreVerticalIcon,
  SearchIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type RowSelectionState,
  type VisibilityState
} from '@tanstack/react-table'

const rowsPerPageOptions = [10, 20, 30, 40, 50]

type DataTableFilter = {
  columnId: string
  label: string
  options: {
    label: string
    value: string
  }[]
}

type DataTableAction<TData> = {
  label: string
  variant?: 'default' | 'destructive'
  separatorBefore?: boolean
  onSelect?: (row: TData) => void
}

type DataTableProps<TData> = {
  data: TData[]
  columns: ColumnDef<TData>[]
  actions?: DataTableAction<TData>[]
  emptyMessage?: string
  enableSelection?: boolean
  filters?: DataTableFilter[]
  getRowId?: (row: TData, index: number) => string
  searchPlaceholder?: string
  searchableColumnIds?: string[]
}

function stringifyCellValue(value: unknown) {
  if (value === null || value === undefined) return ''

  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value)
  }

  return ''
}

function DataTable<TData>({
  data,
  columns,
  actions = [],
  emptyMessage = 'Nenhum resultado encontrado.',
  enableSelection = false,
  filters = [],
  getRowId,
  searchPlaceholder = 'Pesquisar...',
  searchableColumnIds
}: DataTableProps<TData>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const tableColumns = useMemo<ColumnDef<TData>[]>(() => {
    const nextColumns: ColumnDef<TData>[] = []

    if (enableSelection) {
      nextColumns.push({
        id: 'select',
        enableHiding: false,
        enableSorting: false,
        header: ({ table }) => (
          <Checkbox
            aria-label='Selecionar todas as linhas'
            checked={
              table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(checked) => table.toggleAllPageRowsSelected(checked === true)}
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            aria-label='Selecionar linha'
            checked={row.getIsSelected()}
            onCheckedChange={(checked) => row.toggleSelected(checked === true)}
          />
        )
      })
    }

    nextColumns.push(...columns)

    if (actions.length > 0) {
      nextColumns.push({
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => <DataTableRowActions actions={actions} row={row} />
      })
    }

    return nextColumns
  }, [actions, columns, enableSelection])

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      columnFilters,
      columnVisibility,
      globalFilter,
      rowSelection
    },
    initialState: {
      pagination: {
        pageSize: 10
      }
    },
    getRowId: getRowId ?? ((_, index) => String(index)),
    enableRowSelection: enableSelection,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    globalFilterFn: (row, _columnId, filterValue) => {
      const search = String(filterValue).trim().toLowerCase()

      if (!search) return true

      const searchableCells = searchableColumnIds?.length
        ? searchableColumnIds.map((columnId) => row.getValue(columnId))
        : row.getAllCells().map((cell) => cell.getValue())

      return searchableCells.some((value) => stringifyCellValue(value).toLowerCase().includes(search))
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  const selectedRowsCount = table.getFilteredSelectedRowModel().rows.length
  const filteredRowsCount = table.getFilteredRowModel().rows.length
  const pageCount = table.getPageCount()
  const currentPage = table.getState().pagination.pageIndex + 1
  const rowsPerPage = table.getState().pagination.pageSize

  return (
    <div className='flex flex-col gap-4'>
      <DataTableToolbar
        filters={filters}
        globalFilter={globalFilter}
        searchPlaceholder={searchPlaceholder}
        table={table}
        onGlobalFilterChange={setGlobalFilter}
      />

      <div className='border-border overflow-hidden rounded-lg border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='bg-muted/60 hover:bg-muted/60'>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={tableColumns.length} className='h-24 text-center'>
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className='flex flex-col gap-3 px-4 text-sm md:flex-row md:items-center md:justify-between'>
        <p className='text-muted-foreground'>
          {selectedRowsCount} de {filteredRowsCount} selecionados.
        </p>

        <div className='flex flex-wrap items-center gap-4 md:justify-end'>
          <label className='flex items-center gap-2'>
            <Select value={`${rowsPerPage}`} onValueChange={(value) => table.setPageSize(Number(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {rowsPerPageOptions.map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </label>

          <p>
            Pagina {pageCount === 0 ? 0 : currentPage} de {pageCount}
          </p>

          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='icon-sm'
              disabled={!table.getCanPreviousPage()}
              aria-label='Primeira pagina'
              onClick={() => table.setPageIndex(0)}
            >
              <ChevronsLeft className='h-4 w-4' />
            </Button>

            <Button
              variant='outline'
              size='icon-sm'
              disabled={!table.getCanPreviousPage()}
              aria-label='Pagina anterior'
              onClick={() => table.previousPage()}
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>

            <Button
              variant='outline'
              size='icon-sm'
              disabled={!table.getCanNextPage()}
              aria-label='Proxima pagina'
              onClick={() => table.nextPage()}
            >
              <ChevronRight className='h-4 w-4' />
            </Button>

            <Button
              variant='outline'
              size='icon-sm'
              disabled={!table.getCanNextPage()}
              aria-label='Ultima pagina'
              onClick={() => table.setPageIndex(pageCount - 1)}
            >
              <ChevronsRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DataTableToolbar<TData>({
  filters,
  globalFilter,
  searchPlaceholder,
  table,
  onGlobalFilterChange
}: {
  filters: DataTableFilter[]
  globalFilter: string
  searchPlaceholder: string
  table: ReturnType<typeof useReactTable<TData>>
  onGlobalFilterChange: (value: string) => void
}) {
  return (
    <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
      <div className='flex flex-1 flex-col gap-2 sm:flex-row sm:items-center'>
        <div className='relative w-full sm:max-w-72'>
          <SearchIcon className='text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 h-4 w-4 -translate-y-1/2' />
          <Input
            className='pl-8'
            placeholder={searchPlaceholder}
            value={globalFilter}
            onChange={(event) => onGlobalFilterChange(event.target.value)}
          />
        </div>

        {filters.map((filter) => (
          <Select
            key={filter.columnId}
            value={(table.getColumn(filter.columnId)?.getFilterValue() as string | undefined) ?? 'all'}
            onValueChange={(value) => {
              table.getColumn(filter.columnId)?.setFilterValue(value === 'all' ? undefined : value)
            }}
          >
            <SelectTrigger className='w-full sm:w-44'>
              <SelectValue placeholder={filter.label} />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectItem value='all'>{filter.label}</SelectItem>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        ))}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' className='w-full sm:w-auto'>
            <Columns3Icon className='h-4 w-4' />
            Colunas
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(value === true)}
              >
                {String(column.columnDef.header ?? column.id)}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function DataTableRowActions<TData>({
  actions,
  row
}: {
  actions: DataTableAction<TData>[]
  row: Row<TData>
}) {
  return (
    <div className='text-right'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' className='size-8'>
            <MoreVerticalIcon />
            <span className='sr-only'>Abrir menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align='end'>
          {actions.map((action) => (
            <DataTableActionItem key={action.label} action={action} row={row.original} />
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function DataTableActionItem<TData>({ action, row }: { action: DataTableAction<TData>; row: TData }) {
  const item: ReactNode = (
    <DropdownMenuItem variant={action.variant} onSelect={() => action.onSelect?.(row)}>
      {action.label}
    </DropdownMenuItem>
  )

  if (!action.separatorBefore) return item

  return (
    <>
      <DropdownMenuSeparator />
      {item}
    </>
  )
}

export { DataTable, type DataTableAction, type DataTableFilter }
export type { ColumnDef as DataTableColumnDef }
