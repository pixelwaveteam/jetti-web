'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { convertCentsToCurrency } from '@/utils/currency';
import { getDateFormatted } from '@/utils/date';
import { isSameDay, isWithinInterval } from 'date-fns';
import Link from 'next/link';
import { CashFlows as FetchCashFlows } from './actions/fetch-cash-flows';

export type CashFlowDataTable = FetchCashFlows & {
  cashFlowCode: string;
  establishment?: string;
};

export const cashFlowColumns: ColumnDef<CashFlowDataTable>[] = [
  {
    accessorKey: 'terminal',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Código do Terminal
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cashFlow = row.original;

      return (
        <div className='flex flex-col gap-2 items-start'>
          <span>{cashFlow.terminal}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'cashFlowCode',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Código de Leitura
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cashFlow = row.original;

      return (
        <div className='flex flex-col gap-2 items-start'>
          <span>{cashFlow.cashFlowCode}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'operator',
    filterFn: (row, id, value) => {      
      return value.length > 0 ? value.includes(row.original.operator) : true
    },
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
      const cashFlow = row.original;

      return (
        <div className='flex flex-col gap-2 items-start'>
          <span>{cashFlow.operator}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'establishment',
    filterFn: (row, id, value) => {      
      return value.length > 0 ? value.includes(row.original.establishment) : true
    },
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
      const cashFlow = row.original;

      return (
        <div className='flex flex-col gap-2 items-start'>
          <span>{cashFlow.establishment}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'total',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Total
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cashFlow = row.original;

      return (
        <div className='flex flex-col gap-2 items-start'>
          <span>{convertCentsToCurrency(cashFlow.cashIn - cashFlow.cashOut)}</span>
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
      const cashFlow = row.original;

      return (
        <div className='flex flex-col gap-2 items-start'>
          <span>{getDateFormatted(cashFlow.date)}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const cashFlow = row.original;

      return (
        <div className='flex justify-end'>
          <Button variant={'ghost'} size={'icon'} asChild>
            <Link href={`/cash-flows/${cashFlow.id}`}>
              <ChevronRight className='h-4 w-4' />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
