'use client';

import { ColumnDef } from '@/components/data-table';
import { ArrowUpDown, ChevronRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Establishment } from './actions/fetch-establishments';

export type EstablishmentDataTableData = Establishment & {
  state?: string;
  city?: string;
  terminalsTotal?: number;
  organization?: string;
};

export const establishmentColumns: ColumnDef<EstablishmentDataTableData>[] = [
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
    accessorKey: 'organization',
    filterFn: (row, id, value) => {
      return value.length > 0 ? value.includes(row.original.organization) : true;
    },
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Organização
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'state',
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
      const establishment = row.original;

      if(establishment.state) {
        return (
          <div className='flex gap-2 items-center'>
            <span className='truncate'>{establishment.state || '-'}</span>
          </div>
        )
      }
    },
  },
  {
    accessorKey: 'city',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Cidade
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const establishment = row.original;

      if(establishment.city) {
        return (
          <div className='flex gap-2 items-center'>
            <span className='truncate'>{establishment.city || '-'}</span>
          </div>
        )
      }
    },
  },
  {
    accessorKey: 'terminalsTotal',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Terminais
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const establishment = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{establishment.terminalsTotal || 0}</span>
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const establishment = row.original;

      return (
        <div className='flex justify-end'>
          <Button variant={'ghost'} size={'icon'} asChild>
            <Link href={`/establishments/${establishment.id}`}>
              <ChevronRight className='h-4 w-4' />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
