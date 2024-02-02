'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getDateFormatted } from '@/utils/date';
import { isSameDay, isWithinInterval } from 'date-fns';

export type ClosureDataTableData = {
  establishment?: string;
  state?: string;
  operator?: string;
  date?: string;
  gross?: number;
  liquid?: number;
};

export const closureColumns: ColumnDef<ClosureDataTableData>[] = [
  {
    accessorKey: 'establishment',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Local
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const closure = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{closure.establishment || '-'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'state',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Estado
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const closure = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{closure.state || '-'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'operator',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Operador
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const closure = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{closure.operator || '-'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'date',
    filterFn: (row, id, value) => {
      
      const splitDate = (row.getValue(id) as string).slice(0, 10).split('-').map(part => Number(part))
      
      const rowDate = new Date(splitDate[0], splitDate[1]-1, splitDate[2]);

      if(!value.from) { 
        return isSameDay(rowDate, value.to)
      }

      if(!value.to) {
        return isSameDay(rowDate, value.from)
      }

      return isWithinInterval(rowDate, { start: value.from, end: value.to })
    },
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Data
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const closure = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{closure.date ? getDateFormatted(closure.date) : '-'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'gross',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Bruto
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const closure = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{closure.gross || '-'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'liquid',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Liquido
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const closure = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{closure.liquid || '-'}</span>
        </div>
      );
    },
  },
];
