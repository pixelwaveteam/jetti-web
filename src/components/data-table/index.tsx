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
import { DateFilter } from './filters/date';
import { NumberFilter } from './filters/number';
import { SearchableSelectFilter } from './filters/searchable-select';
import { SelectFilter } from './filters/select';
import { TextFilter } from './filters/text';

interface FilterByDate {
  isNumber?: undefined;
  isDate: true;
  options?: undefined;
  searchableSelect?: undefined;
}

interface FilterBySelect {
  isNumber?: undefined;
  isDate?: undefined;
  options: {[label: string]: any};
  searchableSelect?: boolean;
  dependency?: string;
}

interface FilterByDependentSelect {
  isNumber?: undefined;
  isDate?: undefined;
  options: {
    [dependency: string]: {
      [label: string]: string
    } | string[]
  };
  searchableSelect?: boolean;
  dependency: string;
}

interface BaseFilterBy {
  isNumber?: boolean;
  isDate?: undefined;
  options?: undefined;
  searchableSelect?: undefined;
}

type FilterBy = {
  key: string;
  label: string;
} & (FilterByDate | FilterBySelect | FilterByDependentSelect | BaseFilterBy)

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

    function handleFilterChange<K>(value: K) {
      table.getColumn(filter.key)?.setFilterValue(value)
    }

    if(filter.options) {
      if(filter.searchableSelect) {
        const dependencyTableFilterValue = filter.dependency ? table.getColumn(filter.dependency)?.getFilterValue() as string : undefined

        return <SearchableSelectFilter columnFilterValue={columnFilterValue} filter={filter} handleFilterChange={handleFilterChange} dependencyTableFilterValue={dependencyTableFilterValue} key={filter.key} />
      }

      return <SelectFilter columnFilterValue={columnFilterValue} filter={filter} handleFilterChange={handleFilterChange} key={filter.key} />
    }

    if(filter.isDate) {
      return <DateFilter columnFilterValue={columnFilterValue} filter={filter} handleFilterChange={handleFilterChange} key={filter.key} />
    }

    if(filter.isNumber) {
      return <NumberFilter columnFilterValue={columnFilterValue} filter={filter} handleFilterChange={handleFilterChange} key={filter.key} />
    }
    
    return <TextFilter columnFilterValue={columnFilterValue} filter={filter} handleFilterChange={handleFilterChange} key={filter.key} />
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
        <div className='w-full flex flex-wrap gap-2'>
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
        </div>
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
