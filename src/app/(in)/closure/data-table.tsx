import { DataTable } from '@/components/data-table';
import { endOfWeek, startOfWeek } from 'date-fns';
import { fetchOrganizations } from '../organizations/actions/fetch-organizations';
import { fetchUsers } from '../users/actions/fetch-users';
import { ClosureDataTableData, closureColumns } from './create/columns';

interface ClosureDataTableProps {
  data: ClosureDataTableData[];
}

export async function ClosureDataTable({ data }: ClosureDataTableProps) {
  const  organizations = (await fetchOrganizations()).reduce(
    (acc, organization) => ({ ...acc, [organization.name]: organization.name }),
    {} as [{ [x: string]: string[] }]
  );

  const users = (await fetchUsers()).reduce(
    (acc, user) => ({ ...acc, [user.name]: user.name }),
    {} as [{ [x: string]: string[] }]
  );

  const currentStartOfWeek = startOfWeek(new Date());
  const currentEndOfWeek = endOfWeek(new Date());

  return (
    <DataTable
      columns={closureColumns}
      filterBy={[
        {
          key: 'organizationName',
          label: 'organizações',
          searchableSelect: true,
          options: organizations,
        },
        {
          key: 'closer',
          label: 'operadores',
          searchableSelect: true,
          options: users,
        },
        {
          key: 'date',
          label: 'período',
          isDate: true,
          defaultValue: { from: currentStartOfWeek, to: currentEndOfWeek },
        },
      ]}
      data={data}
      globalFiltering
    >
      {/* <SheetProvider>
        <ClosureCreateSheet />
      </SheetProvider> */}
    </DataTable>
  );
}
