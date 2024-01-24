'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { EstablishmentDistributionEditSheet } from '@/app/(in)/establishments/[id]/tabs/distribution/edit/edit-sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SheetProvider } from '@/providers/sheet-provider';
import { EstablishmentDistribution } from '../../../actions/fetch-establishment-distributions';

export type EstablishmentDistributionData = EstablishmentDistribution;

export const establishmentDistributionColumns: ColumnDef<EstablishmentDistributionData>[] =
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
        const establishmentDistribution = row.original;

        return (
          <div className='flex gap-2 items-center'>
            <span>{establishmentDistribution.name}</span>
            <Badge variant='secondary'>
              {establishmentDistribution.percentage / 100}%
            </Badge>
          </div>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const establishmentDistribution = row.original;

        return (
          <div className='flex justify-end'>
            <SheetProvider>
              <EstablishmentDistributionEditSheet
                establishmentDistribution={establishmentDistribution}
              />
            </SheetProvider>
          </div>
        );
      },
    },
  ];
