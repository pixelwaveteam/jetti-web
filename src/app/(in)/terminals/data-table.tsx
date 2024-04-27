import { TerminalDataTableData, terminalColumns } from '@/app/(in)/terminals/columns';
import { TerminalCreateSheet } from '@/app/(in)/terminals/create/create-sheet';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { DataTable } from '@/components/data-table';
import braziliansStates from '@/data/brazilian-states.json';
import { SheetProvider } from '@/providers/sheet-provider';
import { getServerSession } from 'next-auth';
import { fetchOrganizations } from '../organizations/actions/fetch-organizations';
import { DownloadCsvLink } from './download-csv-link';

interface TerminalDataTableProps {
  data: TerminalDataTableData[];
}

export async function TerminalDataTable({ data }: TerminalDataTableProps) {
  const session = await getServerSession(authOptions);

  const organizations = (await fetchOrganizations()).filter(({ id }) => session?.user.organizationsId.includes(id));

  const establishmentsState = data.reduce((acc, { establishmentState }) => 
    (!establishmentState || acc.includes(establishmentState)) ? acc : [...acc, establishmentState] 
  , [] as string[])

  const stateFilterOptions = braziliansStates
    .filter(state => establishmentsState.includes(state.shortName))
    .reduce((acc, state) => (
      { ...acc, [state.name]: state.shortName }
    ), {} as { [x: string]: string; })

  const organizationsFilterOptions = organizations.reduce((acc, organization) => (
    { ...acc, [organization.name]: organization.name }
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
        {
          key: 'organizationName',
          label: 'organizações',
          options: organizationsFilterOptions,
          searchableSelect: true
        },
      ]}
      globalFiltering
    >
      <div className='flex items-center gap-x-4'>
        <SheetProvider>
          <TerminalCreateSheet />
        </SheetProvider>
        <DownloadCsvLink data={data} />
      </div>
    </DataTable>
  );
}
