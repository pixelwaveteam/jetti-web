'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import * as z from 'zod';

import { EstablishmentDistributionEditSheet } from '@/app/(in)/establishments/[id]/tabs/distribution/edit/edit-sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SheetProvider } from '@/providers/sheet-provider';

const EstablishmentDistributionSchema = z.object({
  id: z.string(),
  establishmentId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  percentage: z.coerce.number(),
});

export type EstablishmentDistributionData = z.infer<
  typeof EstablishmentDistributionSchema
>;

export type EstablishmentDistribution = {
  id: string;
  establishmentId: string;
  name: string;
  description?: string;
  percentage: number;
};

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
