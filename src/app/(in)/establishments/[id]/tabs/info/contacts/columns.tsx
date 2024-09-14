'use client';

import { ColumnDef } from '@/components/data-table';
import { ArrowUpDown } from 'lucide-react';

import { EstablishmentContactEditSheet } from '@/app/(in)/establishments/[id]/tabs/info/contacts/edit/edit-sheet';
import { EstablishmentContact } from '@/app/(in)/establishments/actions/fetch-establishment-contacts';
import { Button } from '@/components/ui/button';
import { SheetProvider } from '@/providers/sheet-provider';


export type EstablishmentContactDataTableData = EstablishmentContact

export const establishmentContactColumns: ColumnDef<EstablishmentContactDataTableData>[] =
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
