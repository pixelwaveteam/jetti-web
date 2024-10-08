import {
  InterfaceDataTableData,
  interfaceColumns,
} from '@/app/(in)/interfaces/columns';
import { InterfaceCreateSheet } from '@/app/(in)/interfaces/create/create-sheet';
import { DataTable } from '@/components/data-table';
import { SheetProvider } from '@/providers/sheet-provider';

interface InterfaceDataTableProps {
  data: InterfaceDataTableData[];
}

export function InterfaceDataTable({ data }: InterfaceDataTableProps) {
  return (
    <DataTable columns={interfaceColumns} data={data} globalFiltering>
      <SheetProvider>
        <InterfaceCreateSheet />
      </SheetProvider>
    </DataTable>
  );
}
