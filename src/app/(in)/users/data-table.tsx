import { UserData, userColumns } from '@/app/(in)/users/columns';
import { UserCreateSheet } from '@/app/(in)/users/create/create-sheet';
import { DataTable } from '@/components/data-table';
import { SheetProvider } from '@/providers/sheet-provider';

interface UserDataTableProps {
  users: UserData[];
}

export function UserDataTable({ users }: UserDataTableProps) {
  return (
    <DataTable
      columns={userColumns}
      data={users}
      filterBy={{
        key: 'name',
        label: 'nome',
      }}
    >
      <SheetProvider>
        <UserCreateSheet />
      </SheetProvider>
    </DataTable>
  );
}
