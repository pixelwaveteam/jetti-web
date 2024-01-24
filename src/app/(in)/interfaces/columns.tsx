'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { InterfaceEditSheet } from '@/app/(in)/interfaces/edit/edit-sheet';
import { Button } from '@/components/ui/button';
import { SheetProvider } from '@/providers/sheet-provider';
import { Interface } from './actions/fetch-interfaces';

export type InterfaceData = Interface;

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
        <div className='flex justify-end'>
          <SheetProvider>
            <InterfaceEditSheet interfaceTerminal={interfaceTerminal} />
          </SheetProvider>
        </div>
      );
    },
  },
];
