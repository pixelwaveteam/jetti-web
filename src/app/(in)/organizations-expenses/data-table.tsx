import { DataTable } from '@/components/data-table';
import { SheetProvider } from '@/providers/sheet-provider';
import { OrganizationExpenseDataTableData, organizationsExpensesColumns } from './columns';
import { OrganizationExpenseCreateSheet } from './create/create-sheet';

interface ExpenseDataTableProps {
  data: OrganizationExpenseDataTableData[];
}

export async function OrganizationExpenseDataTable({
  data,
}: ExpenseDataTableProps) {
  return (
    <DataTable columns={organizationsExpensesColumns} data={data} globalFiltering>
      <SheetProvider>
        <OrganizationExpenseCreateSheet />
      </SheetProvider>
    </DataTable>
  );
}
