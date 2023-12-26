'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ChevronRight } from 'lucide-react';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CashFlowSchema = z.object({
  id: z.string(),
  terminalId: z.string(),
  operatorId: z.string(),
  cashIn: z.coerce.number(),
  cashOut: z.coerce.number(),
  net: z.coerce.number(),
  createdAt: z.date(),
});

export type CashFlowData = z.infer<typeof CashFlowSchema>;
export type CashFlow = {
  id: string;
  terminalId: string;
  operatorId: string;
  cashIn: number;
  cashOut: number;
  net: number;
};

export const cashFlowColumns: ColumnDef<CashFlowData>[] = [
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
      const cashFlow = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{cashFlow.id}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const cashFlow = row.original;

      return (
        <div className='flex justify-end'>
          <Button variant={'ghost'} size={'icon'} asChild>
            <Link href={`/cash-flows/${cashFlow.id}`}>
              <ChevronRight className='h-4 w-4' />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
