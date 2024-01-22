'use client';

import { ReactNode, useState } from 'react';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterBy: {
    key: string;
    label: string;
    isNumber?: boolean
  };
  globalFiltering?: boolean;
  children?: ReactNode;
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
          filterBy.isNumber ?
            <Input
              placeholder={`Min de ${filterBy.label}...`}
              value={
                (table.getColumn(filterBy.key)?.getFilterValue() as [number, number])?.[0] ?? ''
              }
              onChange={(event) =>
                table.getColumn(filterBy.key)?.setFilterValue([Number(event.target.value) > 0 ? Number(event.target.value) : undefined, Infinity])
              }
              className='max-w-[10rem]'
              name='search'
            />
        :
          <Input
            placeholder={`Filtrar por ${filterBy.label}...`}
            value={
              (table.getColumn(filterBy.key)?.getFilterValue() as string) ?? ''
            }
            onChange={(event) =>
              table.getColumn(filterBy.key)?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
            name='search'
          />
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
  );
}
