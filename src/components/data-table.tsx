'use client';

import { ReactNode, useState } from 'react';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  Table as TableType,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { X } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Calendar } from './ui/calendar';
import { FormItem } from './ui/form';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface FilterBy  {
  key: string;
  label: string;
  isNumber?: boolean;
  isDate?: boolean;
  options?: {[label: string]: any};
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterBy: FilterBy[];
  globalFiltering?: boolean;
  children?: ReactNode;
}

const renderFilters: (table: TableType<any>, filterBy: FilterBy[]) => ReactNode = (table, filterBy) => {
  return filterBy.map(filter => {
    const columnFilterValue = table.getColumn(filter.key)?.getFilterValue();

    if(filter.options) {
      return (
        <div className='flex items-center gap-x-3' key={filter.key}>
          <Select
            value={ 
              (columnFilterValue as string) ?? ''
            }
            onValueChange={(event) =>
              table.getColumn(filter.key)?.setFilterValue(event)
            }
          >
            <SelectTrigger className='w-[24rem]'>
              <SelectValue placeholder={`Filtrar por ${filter.label}...`} />
            </SelectTrigger>
            <SelectContent>
              {
                Object.keys(filter.options).map(label => (
                  <SelectItem value={filter.options?.[label]} key={filter.options?.[label]}>
                    {label}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
            
          {
            <button
              onClick={() =>
                table.getColumn(filter.key)?.setFilterValue('')
              }
              className='w-fit aria-[hidden="true"]:invisible'
              aria-hidden={columnFilterValue === undefined}
            >
              <X />
            </button>
          }
        </div>
      )
    }

    if(filter.isDate) {
      const columnFilterDateRange = (columnFilterValue as DateRange) ?? ''

      const fromToDisplay = columnFilterDateRange.from && format(columnFilterDateRange.from, 'dd/MM/yyyy')

      const toToDisplay = columnFilterDateRange.to && format(columnFilterDateRange.to, 'dd/MM/yyyy')

      const dateToDisplay = (fromToDisplay && toToDisplay) ? 
          `${fromToDisplay} até ${toToDisplay}` 
        : fromToDisplay

      return (
        <Popover key={filter.key}>
          <PopoverTrigger asChild>
            <FormItem>
              <Input
                placeholder={`Filtrar por ${filter.label}...`}
                value={dateToDisplay ?? ''}
                className='max-w-xs'
                readOnly
              />
            </FormItem>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar
              locale={ptBR}
              mode='range'
              selected={(columnFilterValue as DateRange)}
              onSelect={(range) => {table.getColumn(filter.key)?.setFilterValue(range)}}
              key={filter.key}
            />
          </PopoverContent>
        </Popover>
      )
    }

    if(filter.isNumber) {
      return (
        <Input
          placeholder={`Min de ${filter.label}...`}
          value={
            (columnFilterValue as [number, number])?.[0] ?? ''
          }
          onChange={(event) =>
            table.getColumn(filter.key)?.setFilterValue([Number(event.target.value) > 0 ? Number(event.target.value) : undefined, Infinity])
          }
          className='max-w-[10rem]'
          name='search'
          key={filter.key}
        />
      )
    }
    
    return (
      <Input
        placeholder={`Filtrar por ${filter.label}...`}
        value={
          (columnFilterValue as string) ?? ''
        }
        onChange={(event) =>
          table.getColumn(filter.key)?.setFilterValue(event.target.value)
        }
        className='max-w-sm'
        name='search'
        key={filter.key}
      />
    )
  })
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterBy,
  children,
  globalFiltering,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    <div>
      <div className='flex items-center justify-between gap-2 py-4'>
        {
          globalFiltering && (
            <Input
              placeholder='Filtrar por todos os campos...'
              value={globalFilter ?? ''}
              onChange={({ target: { value } }) => setGlobalFilter(value)}
              className='max-w-sm'
              name='globalSearch'
            />
          )
        }
        {
          renderFilters(table, filterBy)
        }
        {children}
      </div>
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  Nenhum registro encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          Exibindo {table.getRowModel().rows?.length} registro{table.getRowModel().rows?.length > 1 && 's'} de{' '}
          {table.getCoreRowModel().rows.length}
        </div>

        <div className='flex items-center gap-x-6'>
          <div className='flex-1 text-sm text-muted-foreground'>
            Página {table.getState().pagination.pageIndex + 1} de{' '} 
            {table.getPageCount()}
          </div>
          <div className='space-x-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Próxima
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
