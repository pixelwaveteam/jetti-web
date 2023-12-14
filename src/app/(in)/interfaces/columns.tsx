'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import * as z from 'zod';

import { InterfaceEditDrawer } from '@/app/(in)/interfaces/edit/edit-sheet';
import { Button } from '@/components/ui/button';
import { SheetProvider } from '@/providers/sheet-provider';

const InterfaceSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type InterfaceData = z.infer<typeof InterfaceSchema>;
export type Interface = {
  id: number;
  name: string;
};

export const interfaceColumns: ColumnDef<InterfaceData>[] = [
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
      const interfaceTerminal = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{interfaceTerminal.name}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const interfaceTerminal = row.original;

      return (
        <SheetProvider>
          <InterfaceEditDrawer interfaceTerminal={interfaceTerminal} />
        </SheetProvider>
      );
    },
  },
];
