'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { TerminalEditSheet } from '@/app/(in)/terminals/edit/edit-sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SheetProvider } from '@/providers/sheet-provider';
import { Terminal } from './actions/fetch-terminals';

export type TerminalData = Terminal & {
  establishmentState?: string;
  interfaceName?: string;
  cashIn?: number;
  cashOut?: number;
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
    accessorKey: 'establishmentState',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Estado
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const terminal = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{terminal.establishmentState}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'interfaceName',
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
          <span className='truncate'>{terminal.interfaceName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'cashIn',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Entrada
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cashFlow = row.original;

      return (
        <div className='flex flex-col gap-2 items-start'>
          <span>{cashFlow.cashIn || 0}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'cashOut',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Saída
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cashFlow = row.original;

      return (
        <div className='flex flex-col gap-2 items-start'>
          <span>-{cashFlow.cashOut || 0}</span>
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
