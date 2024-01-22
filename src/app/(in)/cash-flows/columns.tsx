'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ChevronRight } from 'lucide-react';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { convertCentsToCurrency } from '@/utils/currency';
import { getDateFormatted } from '@/utils/date';
import { isSameDay, isWithinInterval } from 'date-fns';
import Link from 'next/link';

const CashFlowSchema = z.object({
  id: z.string(),
  cashFlowCode: z.string(),
  terminalId: z.string(),
  operatorId: z.string(),
  cashIn: z.coerce.number(),
  cashOut: z.coerce.number(),
  net: z.coerce.number(),
  createdAt: z.date(),
});

export type CashFlowData = z.infer<typeof CashFlowSchema>;

export type CashFlowDataTable = {
  id: string;
  cashFlowCode: string;
  terminal: string;
  operator: string;
  cashIn: number;
  cashOut: number;
  net: number;
  createdAt: Date;
};

export type CashFlow = {
  id: string;
  terminalId: string;
  operatorId: string;
  cashIn: number;
  cashOut: number;
  net: number;
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
          <span className='text-xs text-gray-300'>{cashFlow.operator}</span>
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
    accessorKey: 'cashIn',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Entrada
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cashFlow = row.original;

      return (
        <div className='flex flex-col gap-2 items-start'>
          <span>{convertCentsToCurrency(cashFlow.cashIn)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'cashOut',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Saída
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cashFlow = row.original;

      return (
        <div className='flex flex-col gap-2 items-start'>
          <span>-{convertCentsToCurrency(cashFlow.cashOut)}</span>
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
    accessorKey: 'createdAt',
    filterFn: (row, id, value) => {
      
      const splitDate = (row.getValue(id) as string).slice(0, 10).split('-').map(part => Number(part))
      
      const rowDate = new Date(splitDate[0], splitDate[1]-1, splitDate[2]);

      console.log({rowDate})

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
          <span>{getDateFormatted(cashFlow.createdAt)}</span>
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
