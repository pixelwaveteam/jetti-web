import { CashFlowData, cashFlowColumns } from '@/app/(in)/cash-flows/columns';
import { CashFlowCreateDrawer } from '@/app/(in)/cash-flows/create/create-sheet';
import { DataTable } from '@/components/data-table';
import { SheetProvider } from '@/providers/sheet-provider';

interface CashFlowDataTableProps {
  cashFlows: CashFlowData[];
}

export function CashFlowDataTable({ cashFlows }: CashFlowDataTableProps) {
  return (
    <DataTable
      columns={cashFlowColumns}
      data={cashFlows}
      filterBy={{
        key: 'name',
        label: 'nome',
      }}
    >
      <SheetProvider>
        <CashFlowCreateDrawer />
      </SheetProvider>
    </DataTable>
  );
}
