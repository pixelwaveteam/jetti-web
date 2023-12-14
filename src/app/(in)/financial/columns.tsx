'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import * as z from 'zod';

import { FinancialEditDrawer } from '@/app/(in)/financial/edit/edit-sheet';
import { Button } from '@/components/ui/button';
import { SheetProvider } from '@/providers/sheet-provider';

const FinancialSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type FinancialData = z.infer<typeof FinancialSchema>;
export type Financial = {
  id: number;
  name: string;
};

export const financialColumns: ColumnDef<FinancialData>[] = [
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
      const financial = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{financial.name}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const financial = row.original;

      return (
        <SheetProvider>
          <FinancialEditDrawer financial={financial} />
        </SheetProvider>
      );
    },
  },
];
