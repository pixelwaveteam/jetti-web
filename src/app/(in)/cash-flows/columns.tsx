'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import * as z from 'zod';

import { CashFlowEditSheet } from '@/app/(in)/cash-flows/edit/edit-sheet';
import { Button } from '@/components/ui/button';
import { SheetProvider } from '@/providers/sheet-provider';

const CashFlowSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type CashFlowData = z.infer<typeof CashFlowSchema>;
export type CashFlow = {
  id: number;
  name: string;
};

export const cashFlowColumns: ColumnDef<CashFlowData>[] = [
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
      const cashFlow = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{cashFlow.name}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const cashFlow = row.original;

      return (
        <SheetProvider>
          <CashFlowEditSheet cashFlow={cashFlow} />
        </SheetProvider>
      );
    },
  },
];
