import {
  ExpenseDataTableData,
  expenseColumns,
} from '@/app/(in)/expenses/columns';
import { ExpenseCreateSheet } from '@/app/(in)/expenses/create/create-sheet';
import { DataTable } from '@/components/data-table';
import { SheetProvider } from '@/providers/sheet-provider';

interface ExpenseDataTableProps {
  data: ExpenseDataTableData[];
}

export async function ExpenseDataTable({
  data,
}: ExpenseDataTableProps) {
  return (
    <DataTable columns={expenseColumns} data={data} globalFiltering>
      <SheetProvider>
        <ExpenseCreateSheet />
      </SheetProvider>
    </DataTable>
  );
}
