'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import * as z from 'zod';

import { UserEditDrawer } from '@/app/(in)/users/edit/edit-sheet';
import { Button } from '@/components/ui/button';
import { SheetProvider } from '@/providers/sheet-provider';

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type UserData = z.infer<typeof UserSchema>;
export type User = {
  id: number;
  name: string;
};

export const userColumns: ColumnDef<UserData>[] = [
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
      const user = row.original;

      return (
        <div className='flex gap-2 items-center'>
          <span className='truncate'>{user.name}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <SheetProvider>
          <UserEditDrawer user={user} />
        </SheetProvider>
      );
    },
  },
];
