import {
  CashFlowDataTable,
  cashFlowColumns,
} from '@/app/(in)/cash-flows/columns';
import { CashFlowCreateSheet } from '@/app/(in)/cash-flows/create/create-sheet';
import { DataTable } from '@/components/data-table';
import { SheetProvider } from '@/providers/sheet-provider';
import { fetchEstablishments } from '../establishments/actions/fetch-establishments';
import { fetchUsers } from '../users/actions/fetch-users';

interface CashFlowDataTableProps {
  data: CashFlowDataTable[];
}

export async function CashFlowDataTable({ data }: CashFlowDataTableProps) {
  const users = await fetchUsers();

  const operators = users.map(({name}) => name)

  const establishments = (await fetchEstablishments()).map(({ name }) => name)

  return (
    <DataTable
      columns={cashFlowColumns}
      data={data}
      filterBy={[
        {
          key: 'cashFlowCode',
          label: 'código'
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
          isDate: true
        },
        {
          key: 'operator',
          label: 'operadores',
          items: operators
        }
      ]}
      globalFiltering
    >
      <SheetProvider>
        <CashFlowCreateSheet />
      </SheetProvider>
    </DataTable>
  );
}
