'use client';

import { ColumnDef } from '@/components/data-table';
import { ArrowUpDown, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { convertCentsToCurrency } from '@/utils/currency';
import { format, isSameDay, isWithinInterval } from 'date-fns';
import Link from 'next/link';
import { Closure } from '../actions/fetch-closures';

export type ClosureDataTableData = Closure & {
  closer?: string;
  organizationName: string;
  date: Date;
};

export const closureColumns: ColumnDef<ClosureDataTableData>[] = [
  {
    accessorKey: 'organizationName',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Organização
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const closure = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{closure.organizationName || '-'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'closer',
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
          <span className='truncate'>{closure.closer || '-'}</span>
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
          <span className='truncate'>{format(new Date(closure.closure.date), 'MM/yyyy')}</span>
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
          <span className='truncate'>{convertCentsToCurrency(closure.closure.gross)}</span>
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
          <span className='truncate'>{convertCentsToCurrency(closure.closure.net)}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const closure = row.original;

      return (
        <Button variant={'ghost'} size={'icon'} asChild>
          <Link href={`/closure/${closure.closure.id}`}>
            <ChevronRight className='h-4 w-4' />
          </Link>
        </Button>
      );
    },
  },
];
