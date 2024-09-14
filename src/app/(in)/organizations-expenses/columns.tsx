'use client';

import { ColumnDef } from '@/components/data-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SheetProvider } from '@/providers/sheet-provider';
import { convertCentsToCurrency } from '@/utils/currency';
import { getDateFormatted } from '@/utils/date';
import { OrganizationExpense } from './actions/fetch-organizations-expenses';
import { OrganizationExpenseEditSheet } from './edit/edit-sheet';

export type OrganizationExpenseDataTableData = OrganizationExpense & {
  name?: string;
  organizationName?: string;
};

export const organizationsExpensesColumns: ColumnDef<OrganizationExpenseDataTableData>[] = [
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
      const expense = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{expense.organizationName || '-'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Nome
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const expense = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{expense.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Valor
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const expense = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{convertCentsToCurrency(expense.amount)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'createdAt',
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
      const expense = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{getDateFormatted(expense.createdAt)}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const expense = row.original;

      return (
        <div className='flex justify-end'>
          <SheetProvider>
            <OrganizationExpenseEditSheet organizationExpense={expense} />
          </SheetProvider>
        </div>
      );
    },
  },
];
