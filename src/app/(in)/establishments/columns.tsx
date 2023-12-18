'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import * as z from 'zod';

import { EstablishmentEditSheet } from '@/app/(in)/establishments/edit/edit-sheet';
import { Button } from '@/components/ui/button';
import { SheetProvider } from '@/providers/sheet-provider';

const EstablishmentSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type EstablishmentData = z.infer<typeof EstablishmentSchema>;
export type Establishment = {
  id: number;
  name: string;
};

export const establishmentColumns: ColumnDef<EstablishmentData>[] = [
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
      const establishment = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{establishment.name}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const establishment = row.original;

      return (
        <SheetProvider>
          <EstablishmentEditSheet establishment={establishment} />
        </SheetProvider>
      );
    },
  },
];
