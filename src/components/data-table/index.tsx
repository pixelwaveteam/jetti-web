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
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { DateFilter } from './filters/date';
import { NumberFilter } from './filters/number';
import { SearchableCheckComboboxFilter } from './filters/searchable-check-combobox';
import { SearchableSelectFilter } from './filters/searchable-select';
import { SelectFilter } from './filters/select';
import { TextFilter } from './filters/text';

interface FilterByDate {
  isNumber?: undefined;
  isDate: true;
  options?: undefined;
  searchableSelect?: undefined;
  items?: undefined;
}

interface FilterBySelect {
  isNumber?: undefined;
  isDate?: undefined;
  options: {[label: string]: any};
  searchableSelect?: boolean;
  dependency?: string;
  items?: undefined;
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
  items?: undefined;
}

interface FilterByCheckCombobox {
  isNumber?: undefined;
  isDate?: undefined;
  options?: undefined;
  items: string[];
  searchableSelect?: undefined;
  dependency?: undefined;
}

interface BaseFilterBy {
  isNumber?: boolean;
  isDate?: undefined;
  items?: undefined;
  options?: undefined;
  searchableSelect?: undefined;
}

type FilterBy = {
  key: string;
  label: string;
  defaultValue?: any;
} & (FilterByDate | FilterBySelect | FilterByDependentSelect | FilterByCheckCombobox | BaseFilterBy)

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

    if(filter.items) {
      const values = columnFilterValue instanceof Array ? columnFilterValue : []

      return <SearchableCheckComboboxFilter columnFilterValue={values} filter={filter} handleFilterChange={handleFilterChange} key={filter.label} />
    }

    if(filter.options) {
      if(filter.searchableSelect) {
        const dependencyTableFilterValue = filter.dependency ? table.getColumn(filter.dependency)?.getFilterValue() as string : undefined

        return <SearchableSelectFilter columnFilterValue={columnFilterValue} filter={filter} handleFilterChange={handleFilterChange} dependencyTableFilterValue={dependencyTableFilterValue} key={filter.label} />
      }

      return <SelectFilter columnFilterValue={columnFilterValue} filter={filter} handleFilterChange={handleFilterChange} key={filter.label} />
    }

    if(filter.isDate) {
      return <DateFilter columnFilterValue={columnFilterValue} filter={filter} handleFilterChange={handleFilterChange} key={filter.label} />
    }

    if(filter.isNumber) {
      return <NumberFilter columnFilterValue={columnFilterValue} filter={filter} handleFilterChange={handleFilterChange} key={filter.label} />
    }
    
    return <TextFilter columnFilterValue={columnFilterValue} filter={filter} handleFilterChange={handleFilterChange} key={filter.label} />
  })
}

export function DataTable<TData, TValue>({
  columns,
  data,
  filterBy,
  children,
  globalFiltering,
}: DataTableProps<TData, TValue>) {
  const defaultFilters = filterBy.filter(filter => filter.defaultValue).map(({ key, defaultValue }) => ({ id: key, value: defaultValue }))
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(defaultFilters);
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
      <div className='flex flex-col gap-2 py-4'>
        <Card className='w-full'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Filtros</CardTitle>
          </CardHeader>
          <CardContent className='w-full gap-2 flex flex-wrap'>
            {
              renderFilters(table, filterBy)
            }
          </CardContent>
        </Card>
        <div className='flex w-full justify-end gap-2'>
          {
            globalFiltering && (
              <Input
                placeholder='Filtrar por todos os campos...'
                value={globalFilter ?? ''}
                onChange={({ target: { value } }) => setGlobalFilter(value)}
                name='globalSearch'
              />
            )
          }

          {children}
        </div>
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
