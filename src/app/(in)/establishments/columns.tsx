'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ChevronRight } from 'lucide-react';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

const EstablishmentSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  name: z.string(),
  state: z.string().optional(),
  city: z.string().optional(),
  terminalsTotal: z.number().optional().default(0),
});

export type EstablishmentData = z.infer<typeof EstablishmentSchema>;
export type Establishment = {
  id: string;
  organizationId: string;
  name: string;
  state?: string;
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
            <span className='truncate'>{establishment.state}</span>
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
            <span className='truncate'>{establishment.city}</span>
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

      if(establishment.terminalsTotal) {
        return (
          <div className='flex gap-2 items-center'>
            <span className='truncate'>{establishment.terminalsTotal}</span>
          </div>
        )
      }
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
