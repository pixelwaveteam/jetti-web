import { InterfaceData, interfaceColumns } from '@/app/(in)/interfaces/columns';
import { InterfaceCreateSheet } from '@/app/(in)/interfaces/create/create-sheet';
import { DataTable } from '@/components/data-table';
import { SheetProvider } from '@/providers/sheet-provider';

interface InterfaceDataTableProps {
  data: InterfaceData[];
}

export function InterfaceDataTable({ data }: InterfaceDataTableProps) {
  return (
    <DataTable
      columns={interfaceColumns}
      data={data}
      filterBy={{
        key: 'name',
        label: 'nome',
      }}
    >
      <SheetProvider>
        <InterfaceCreateSheet />
      </SheetProvider>
    </DataTable>
  );
}
