'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import * as z from 'zod';

import { TerminalEditDrawer } from '@/app/(in)/terminals/edit/edit-drawer';
import { Button } from '@/components/ui/button';
import { SheetProvider } from '@/providers/sheet-provider';

const TerminalSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type TerminalData = z.infer<typeof TerminalSchema>;
export type Terminal = {
  id: number;
  name: string;
};

export const terminalColumns: ColumnDef<TerminalData>[] = [
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
      const terminal = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{terminal.name}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const terminal = row.original;

      return (
        <SheetProvider>
          <TerminalEditDrawer terminal={terminal} />
        </SheetProvider>
      );
    },
  },
];
