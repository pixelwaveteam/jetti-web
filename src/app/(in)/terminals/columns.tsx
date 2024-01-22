'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import * as z from 'zod';

import { TerminalEditSheet } from '@/app/(in)/terminals/edit/edit-sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SheetProvider } from '@/providers/sheet-provider';

const TerminalSchema = z.object({
  id: z.string(),
  establishmentId: z.string(),
  interfaceId: z.string(),
  code: z.string(),
  isActive: z.boolean(),
  establishment: z.string(),
  interface: z.string(),
});

export type TerminalData = z.infer<typeof TerminalSchema>;
export type Terminal = {
  id: string;
  establishmentId: string;
  interfaceId: string;
  code: string;
  isActive: boolean;
  establishment: string;
  interface: string;
};

export const terminalColumns: ColumnDef<TerminalData>[] = [
  {
    accessorKey: 'code',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Código
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const terminal = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{terminal.code}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'isActive',
    header: () => {
      return "Status";
    },
    cell: ({ row }) => {
      const terminal = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <Badge
            variant={terminal.isActive ? 'default' : 'destructive'}
            className='text-xs'
          >
            {terminal.isActive ? 'Ativo' : 'Inativo'}
          </Badge>
        </div>
      );
    },
    enableGlobalFilter: false,
  },
  {
    accessorKey: 'establishment',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Local
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const terminal = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{terminal.establishment}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'interface',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Interfaces
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const terminal = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{terminal.interface}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const terminal = row.original;

      return (
        <div className='flex justify-end'>
          <SheetProvider>
            <TerminalEditSheet terminal={terminal} />
          </SheetProvider>
        </div>
      );
    },
  },
];
