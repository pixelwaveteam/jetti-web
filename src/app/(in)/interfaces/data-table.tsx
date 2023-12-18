import { InterfaceData, interfaceColumns } from '@/app/(in)/interfaces/columns';
import { InterfaceCreateSheet } from '@/app/(in)/interfaces/create/create-sheet';
import { DataTable } from '@/components/data-table';
import { SheetProvider } from '@/providers/sheet-provider';

interface InterfaceDataTableProps {
  interfaces: InterfaceData[];
}

export function InterfaceDataTable({ interfaces }: InterfaceDataTableProps) {
  return (
    <DataTable
      columns={interfaceColumns}
      data={interfaces}
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
