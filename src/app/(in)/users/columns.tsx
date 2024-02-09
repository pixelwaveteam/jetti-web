'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { UserEditSheet } from '@/app/(in)/users/edit/edit-sheet';
import { Button } from '@/components/ui/button';
import { SheetProvider } from '@/providers/sheet-provider';

import { UserEstablishment } from './actions/fetch-user-establishments';
import { UserOrganization } from './actions/fetch-user-organizations';
import { User } from './actions/fetch-users';

export interface UserDataTableData extends User {
  organizations: UserOrganization[];
  establishments: UserEstablishment[];
}

export const userColumns: ColumnDef<UserDataTableData>[] = [
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
