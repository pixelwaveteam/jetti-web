import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { DataTable } from '@/components/data-table';
import { endOfYear, startOfYear } from 'date-fns';
import { getServerSession } from 'next-auth';
import { fetchOrganizations } from '../organizations/actions/fetch-organizations';
import { fetchUsers } from '../users/actions/fetch-users';
import { ClosureDataTableData, closureColumns } from './create/columns';

interface ClosureDataTableProps {
  data: ClosureDataTableData[];
}

export async function ClosureDataTable({ data }: ClosureDataTableProps) {
  const session = await getServerSession(authOptions);

  const  organizations = (await fetchOrganizations()).reduce(
    (acc, organization) => { 
      if(!session?.user.organizationsId.includes(organization.id)) {
        return acc
      }

      return ({ ...acc, [organization.name]: organization.name })
    },
    {} as [{ [x: string]: string[] }]
  );

  const users = (await fetchUsers()).reduce(
    (acc, user) => ({ ...acc, [user.name]: user.name }),
    {} as [{ [x: string]: string[] }]
  );

  const currentStartOfWeek = startOfYear(new Date());
  const currentEndOfWeek = endOfYear(new Date());

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
