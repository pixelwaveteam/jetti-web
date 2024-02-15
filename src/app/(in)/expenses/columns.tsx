'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { ExpenseEditSheet } from '@/app/(in)/expenses/edit/edit-sheet';
import { Button } from '@/components/ui/button';
import { SheetProvider } from '@/providers/sheet-provider';
import { convertCentsToCurrency } from '@/utils/currency';
import { Expense } from './actions/fetch-expenses';

export type ExpenseDataTableData = Expense;

export const expenseColumns: ColumnDef<ExpenseDataTableData>[] = [
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
    id: 'actions',
    cell: ({ row }) => {
      const expense = row.original;

      return (
        <div className='flex justify-end'>
          <SheetProvider>
            <ExpenseEditSheet expense={expense} />
          </SheetProvider>
        </div>
      );
    },
  },
];
