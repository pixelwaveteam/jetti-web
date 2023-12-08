import { TerminalData, terminalColumns } from '@/app/(in)/terminals/columns';
import { TerminalCreateDrawer } from '@/app/(in)/terminals/create/create-drawer';
import { DataTable } from '@/components/data-table';
import { SheetProvider } from '@/providers/sheet-provider';

interface TerminalDataTableProps {
  terminals: TerminalData[];
}

export function TerminalDataTable({ terminals }: TerminalDataTableProps) {
  return (
    <DataTable
      columns={terminalColumns}
      data={terminals}
      filterBy={{
        key: 'name',
        label: 'nome',
      }}
    >
      <SheetProvider>
        <TerminalCreateDrawer />
      </SheetProvider>
    </DataTable>
  );
}
