'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getDateFormatted } from '@/utils/date';
import { isSameDay, isWithinInterval } from 'date-fns';
import { CashFlow } from '../cash-flows/actions/fetch-cash-flows';

export type ReportCashInOutDataTableData = CashFlow & {
  organization?: string;
};

export const cashFlowColumns: ColumnDef<ReportCashInOutDataTableData>[] = [
  {
    accessorKey: 'organization',
    filterFn: (row, id, value) => {
      return value.length > 0 ? value.includes(row.original.organization) : true;
    },
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
  },
  {
    accessorKey: 'establishment',
    filterFn: (row, id, value) => {
      return value.length > 0
        ? value.includes(row.original.registeredEstablishmentName)
        : true;
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
          <span>{cashFlow.registeredEstablishmentName || '-'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'terminal',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Terminal
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cashFlow = row.original;

      return (
        <div className='flex flex-col gap-2 items-start'>
          <span>
            {cashFlow.terminal} - {cashFlow.registeredInterfaceName || ''}
          </span>
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
          <span>{cashFlow.input/100}</span>
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
          <span>{cashFlow.output/100}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'date',
    filterFn: (row, id, value) => {
      const splitDate = (row.getValue(id) as string)
        .slice(0, 10)
        .split('-')
        .map((part) => Number(part));

      const rowDate = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);

      if (!value.from) {
        return isSameDay(rowDate, value.to);
      }

      if (!value.to) {
        return isSameDay(rowDate, value.from);
      }

      return isWithinInterval(rowDate, { start: value.from, end: value.to });
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
];
