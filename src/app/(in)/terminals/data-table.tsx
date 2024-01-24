import { TerminalData, terminalColumns } from '@/app/(in)/terminals/columns';
import { TerminalCreateSheet } from '@/app/(in)/terminals/create/create-sheet';
import { DataTable } from '@/components/data-table';
import braziliansStates from '@/data/brazilian-states.json';
import { SheetProvider } from '@/providers/sheet-provider';

interface TerminalDataTableProps {
  data: TerminalData[];
}

export function TerminalDataTable({ data }: TerminalDataTableProps) {
  const stateFilterOptions = braziliansStates.reduce((acc, state) => (
    { ...acc, [state.name]: state.shortName }
  ), {} as { [x: string]: string; })

  return (
    <DataTable
      columns={terminalColumns}
      data={data}
      filterBy={[
        {
          key: 'isActive',
          label: 'status',
          options: {
            Ativo: true,
            Desativo: false
          }
        },
        {
          key: 'code',
          label: 'código'
        },
        {
          key: 'establishment',
          label: 'estados',
          options: stateFilterOptions,
          searchableSelect: true
        },
      ]}
      globalFiltering
    >
      <SheetProvider>
        <TerminalCreateSheet />
      </SheetProvider>
    </DataTable>
  );
}
