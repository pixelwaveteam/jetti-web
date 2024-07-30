'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { EstablishmentDistributionEditSheet } from '@/app/(in)/establishments/[id]/tabs/distribution/edit/edit-sheet';
import { EstablishmentDistribution, PercentageOutOfDistribution } from '@/app/(in)/establishments/actions/fetch-establishment-distributions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SheetProvider } from '@/providers/sheet-provider';

function getPercentageOutOfDistributionDisplay(percentageOutOfDistribution: PercentageOutOfDistribution, jettiPercentageOnDistribution: number, establishmentPercentageOnDistribution: number) {
  switch(percentageOutOfDistribution) {
    case 'JETTI': 
      return (
        <>
          <Badge variant='outline'>
            {jettiPercentageOnDistribution/100}%
          </Badge>

          <span className='capitalize'>da Jetti</span>
        </>
      )
    
    case 'ESTABLISHMENT': 
      return (
        <>
          <Badge variant='outline'>
            {establishmentPercentageOnDistribution/100}%
          </Badge>

          <span className='capitalize'>do local</span>
        </>
      )

    case 'TOTAL': 
      return (
        <span className='capitalize'>do total</span>
      )
  }
}

export type EstablishmentDistributionDataTableData = EstablishmentDistribution;

export const establishmentDistributionColumns = (
    jettiPercentageOnDistribution: number, 
    establishmentPercentageOnDistribution: number
  ): ColumnDef<EstablishmentDistributionDataTableData>[] => 
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
              {
                establishmentDistribution.percentageOutOfDistribution  && (
                  <>
                    <span>de</span>

                    {getPercentageOutOfDistributionDisplay(
                      establishmentDistribution.percentageOutOfDistribution, 
                      jettiPercentageOnDistribution, 
                      establishmentPercentageOnDistribution
                    )}
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