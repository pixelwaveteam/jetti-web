'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { TerminalEditSheet } from '@/app/(in)/terminals/edit/edit-sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SheetProvider } from '@/providers/sheet-provider';
import { Terminal } from './actions/fetch-terminals';

export type TerminalDataTableData = Terminal & {
  establishmentState?: string;
  establishmentName?: string;
  organizationName?: string;
  interfaceName?: string;
  input?: number;
  output?: number;
};

export const terminalColumns: ColumnDef<TerminalDataTableData>[] = [
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
          <span className='truncate'>
            {String(terminal.code).padStart(6, '0')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'isActive',
    header: () => {
      return 'Status';
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
    accessorKey: 'establishmentName',
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
          <span className='truncate'>{terminal.establishmentName || '-'}</span>
        </div>
      );
    },
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
          <span className='truncate'>{terminal.establishmentState || '-'}</span>
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
          <span className='truncate'>{terminal.interfaceName || '-'}</span>
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
          <span>{cashFlow.input/100}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'organizationName',
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
          <span>{cashFlow.output/100}</span>
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
