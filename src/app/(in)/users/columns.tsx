'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import * as z from 'zod';

import { UserEditSheet } from '@/app/(in)/users/edit/edit-sheet';
import { Button } from '@/components/ui/button';
import { SheetProvider } from '@/providers/sheet-provider';

const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  role: z.enum(['ADMIN', 'OPERATOR'] as const),
  avatarId: z.string().optional(),
  isActive: z.boolean(),
});

export type UserData = z.infer<typeof UserSchema>;
export type User = {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'OPERATOR';
  avatarId?: string;
  isActive: boolean;
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
        <div className='flex flex-col gap-2 items-start'>
          <span>{user.name}</span>
          <span className='text-xs text-gray-300'>{user.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'role',
    header: 'Permissão',
    cell: ({ row }) => {
      const user = row.original;

      const role = user.role === 'ADMIN' ? 'Admin' : 'Operador';

      return <span>{role}</span>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className='flex justify-end'>
          <SheetProvider>
            <UserEditSheet user={user} />
          </SheetProvider>
        </div>
      );
    },
  },
];
