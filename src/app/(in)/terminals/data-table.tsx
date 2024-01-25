import { TerminalDataTableData, terminalColumns } from '@/app/(in)/terminals/columns';
import { TerminalCreateSheet } from '@/app/(in)/terminals/create/create-sheet';
import { DataTable } from '@/components/data-table';
import braziliansStates from '@/data/brazilian-states.json';
import { SheetProvider } from '@/providers/sheet-provider';

interface TerminalDataTableProps {
  data: TerminalDataTableData[];
}

export async function TerminalDataTable({ data }: TerminalDataTableProps) {
  const establishmentsState = data.reduce((acc, { establishmentState }) => 
    (!establishmentState || acc.includes(establishmentState)) ? acc : [...acc, establishmentState] 
  , [] as string[])

  const stateFilterOptions = braziliansStates
    .filter(state => establishmentsState.includes(state.shortName))
    .reduce((acc, state) => (
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
          key: 'establishmentState',
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
