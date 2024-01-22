import { TerminalData, terminalColumns } from '@/app/(in)/terminals/columns';
import { TerminalCreateSheet } from '@/app/(in)/terminals/create/create-sheet';
import { DataTable } from '@/components/data-table';
import { SheetProvider } from '@/providers/sheet-provider';

interface TerminalDataTableProps {
  data: TerminalData[];
}

export function TerminalDataTable({ data }: TerminalDataTableProps) {
  return (
    <DataTable
      columns={terminalColumns}
      data={data}
      filterBy={[{
        key: 'isActive',
        label: 'status',
        options: {
          Ativo: true,
          Desativo: false
        }
      }]}
      globalFiltering
    >
      <SheetProvider>
        <TerminalCreateSheet />
      </SheetProvider>
    </DataTable>
  );
}
