import {
  EstablishmentDataTableData,
  establishmentColumns,
} from '@/app/(in)/establishments/columns';
import { EstablishmentCreateSheet } from '@/app/(in)/establishments/create/create-sheet';
import { DataTable } from '@/components/data-table';
import { DownloadCsvLink } from '@/components/download-csv-link';
import braziliansCitiesByState from '@/data/brazilian-cities-by-state.json';
import braziliansStates from '@/data/brazilian-states.json';
import { SheetProvider } from '@/providers/sheet-provider';

interface EstablishmentDataTableProps {
  data: EstablishmentDataTableData[];
  userOrganizations: string[];
}

export function EstablishmentDataTable({ data, userOrganizations }: EstablishmentDataTableProps) {
  const stateFilterOptions = braziliansStates.reduce(
    (acc, state) => ({ ...acc, [state.name]: state.shortName }),
    {} as { [x: string]: string }
  );

  const cityFilterOptions = braziliansCitiesByState.states.reduce(
    (acc, state) => ({ ...acc, [state.short]: state.cities }),
    {} as [{ [x: string]: string[] }]
  );

  console.log({esta: data})

  return (
    <DataTable
      columns={establishmentColumns}
      data={data}
      filterBy={[
        {
          key: 'name',
          label: 'nomes',
        },
        {
          key: 'isActive',
          label: 'status',
          options: {
            Ativo: true,
            Desativo: false
          }
        },
        {
          key: 'state',
          label: 'estados',
          options: stateFilterOptions,
          searchableSelect: true,
        },
        {
          key: 'city',
          label: 'cidades',
          options: cityFilterOptions,
          searchableSelect: true,
          dependency: 'state',
        },
        {
          key: 'terminalsTotal',
          label: 'terminais',
          isNumber: true,
        },
        {
          key: 'organization',
          label: 'organizações',
          items: userOrganizations,
        }
      ]}
      globalFiltering
    >
      <div className='flex items-center gap-x-4'>
        <SheetProvider>
          <EstablishmentCreateSheet />
        </SheetProvider>
        <DownloadCsvLink data={data} fileName='Locais' />
      </div>
    </DataTable>
  );
}
