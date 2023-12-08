'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import * as z from 'zod';

import { OrganizationEditDrawer } from '@/app/(in)/organizations/edit/edit-drawer';
import { Button } from '@/components/ui/button';
import { SheetProvider } from '@/providers/sheet-provider';

const OrganizationSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type OrganizationData = z.infer<typeof OrganizationSchema>;
export type Organization = {
  id: number;
  name: string;
};

export const organizationColumns: ColumnDef<OrganizationData>[] = [
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
      const organization = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{organization.name}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const organization = row.original;

      return (
        <SheetProvider>
          <OrganizationEditDrawer organization={organization} />
        </SheetProvider>
      );
    },
  },
];
