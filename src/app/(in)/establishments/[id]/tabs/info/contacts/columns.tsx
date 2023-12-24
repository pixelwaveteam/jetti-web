'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import * as z from 'zod';

import { EstablishmentContactEditSheet } from '@/app/(in)/establishments/[id]/tabs/info/contacts/edit/edit-sheet';
import { Button } from '@/components/ui/button';
import { SheetProvider } from '@/providers/sheet-provider';

const EstablishmentContactSchema = z.object({
  id: z.string(),
  establishmentId: z.string(),
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

export type EstablishmentContactData = z.infer<
  typeof EstablishmentContactSchema
>;
export type EstablishmentContact = {
  id: string;
  establishmentId: string;
  name: string;
  phone: string;
  email: string;
};

export const establishmentContactColumns: ColumnDef<EstablishmentContactData>[] =
  [
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
        const establishmentContact = row.original;

        return (
          <div className='flex gap-2 items-center'>
            <span className='truncate'>{establishmentContact.name}</span>
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const establishmentContact = row.original;

        return (
          <div className='flex justify-end'>
            <SheetProvider>
              <EstablishmentContactEditSheet
                establishmentContact={establishmentContact}
              />
            </SheetProvider>
          </div>
        );
      },
    },
  ];
