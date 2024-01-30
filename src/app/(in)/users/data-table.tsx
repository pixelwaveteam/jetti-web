import { UserDataTableData, userColumns } from '@/app/(in)/users/columns';
import { UserCreateSheet } from '@/app/(in)/users/create/create-sheet';
import { DataTable } from '@/components/data-table';
import { SheetProvider } from '@/providers/sheet-provider';

interface UserDataTableProps {
  data: UserDataTableData[];
}

export function UserDataTable({ data }: UserDataTableProps) {
  return (
    <DataTable columns={userColumns} data={data} globalFiltering>
      <SheetProvider>
        <UserCreateSheet />
      </SheetProvider>
    </DataTable>
  );
}
