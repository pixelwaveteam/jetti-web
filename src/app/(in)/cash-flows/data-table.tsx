import {
  CashFlowDataTableData,
  cashFlowColumns,
} from '@/app/(in)/cash-flows/columns';
import { CashFlowCreateSheet } from '@/app/(in)/cash-flows/create/create-sheet';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { ClosureButton } from '@/components/closure-button';
import { DataTable } from '@/components/data-table';
import { NewClosureProvider } from '@/providers/new-closure-provider';
import { SheetProvider } from '@/providers/sheet-provider';
import { endOfWeek, startOfWeek } from 'date-fns';
import { getServerSession } from 'next-auth';
import { fetchEstablishments } from '../establishments/actions/fetch-establishments';
import { fetchUsers } from '../users/actions/fetch-users';

interface CashFlowDataTableProps {
  data: CashFlowDataTableData[];
}

export async function CashFlowDataTable({ data }: CashFlowDataTableProps) {
  const session = await getServerSession(authOptions);

  const isUserAdmin = session?.user.role === "ADMIN"

  const users = await fetchUsers();

  const operators = users.map(({ name }) => name);

  const establishments = (await fetchEstablishments())
    .map(({ name }) => name)
    .filter((value, index, self) => self.indexOf(value) === index);

  const currentStartOfWeek = startOfWeek(new Date());
  const currentEndOfWeek = endOfWeek(new Date());

  return (
    <NewClosureProvider>
      <DataTable
        columns={cashFlowColumns}
        data={data}
        filterBy={[
          {
            key: 'cashFlowCode',
            label: 'código',
          },
          {
            key: 'terminal',
            label: 'código de terminal',
          },
          {
            key: 'establishment',
            label: 'locais',
            items: establishments,
          },
          {
            key: 'date',
            label: 'intervalo',
            isDate: true,
            defaultValue: { from: currentStartOfWeek, to: currentEndOfWeek },
          },
          {
            key: 'operator',
            label: 'operadores',
            items: operators,
          },
        ]}
        globalFiltering
      >
        <div className='flex items-center gap-x-6'>
          {
            isUserAdmin && (
              <ClosureButton />
            )
          }

          <SheetProvider>
            <CashFlowCreateSheet />
          </SheetProvider>
        </div>
      </DataTable>
    </NewClosureProvider>
  );
}
