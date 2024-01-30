import {
  OrganizationDataTableData,
  organizationColumns,
} from '@/app/(in)/organizations/columns';
import { OrganizationCreateSheet } from '@/app/(in)/organizations/create/create-sheet';
import { DataTable } from '@/components/data-table';
import { SheetProvider } from '@/providers/sheet-provider';

interface OrganizationDataTableProps {
  data: OrganizationDataTableData[];
}

export async function OrganizationDataTable({
  data,
}: OrganizationDataTableProps) {
  return (
    <DataTable columns={organizationColumns} data={data} globalFiltering>
      <SheetProvider>
        <OrganizationCreateSheet />
      </SheetProvider>
    </DataTable>
  );
}
