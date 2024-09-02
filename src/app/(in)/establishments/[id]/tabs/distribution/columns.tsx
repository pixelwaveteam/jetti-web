'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { EstablishmentDistributionEditSheet } from '@/app/(in)/establishments/[id]/tabs/distribution/edit/edit-sheet';
import { EstablishmentDistribution, PercentageOutOfDistribution } from '@/app/(in)/establishments/actions/fetch-establishment-distributions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SheetProvider } from '@/providers/sheet-provider';

function getPercentageOutOfDistributionDisplay(percentageOutOf: PercentageOutOfDistribution) {
  switch(percentageOutOf) {
    case 'JETTI': 
      return (
        <span>da Jetti</span>
      )
    
    case 'ESTABLISHMENT': 
      return (
        <span>do local</span>
      )
  }
}

export type EstablishmentDistributionDataTableData = EstablishmentDistribution;

export const establishmentDistributionColumns: ColumnDef<EstablishmentDistributionDataTableData>[] = 
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
        cell: async ({ row }) => {
          const establishmentDistribution = row.original;

          return (
            <div className='flex gap-2 items-center'>
              <span>{establishmentDistribution.name}</span>
              {
                establishmentDistribution.percentageOutOf !== 'TOTAL' && (
                  <>
                    <Badge variant='outline'>
                      {establishmentDistribution.percentage / 100}%
                    </Badge>

                    <>
                      {getPercentageOutOfDistributionDisplay(establishmentDistribution.percentageOutOf)}
                    </>
                  </>
                )
              }
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