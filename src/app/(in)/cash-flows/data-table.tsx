import { CashFlowData, cashFlowColumns } from '@/app/(in)/cash-flows/columns';
import { CashFlowCreateSheet } from '@/app/(in)/cash-flows/create/create-sheet';
import { DataTable } from '@/components/data-table';
import { SheetProvider } from '@/providers/sheet-provider';

interface CashFlowDataTableProps {
  data: CashFlowData[];
}

export function CashFlowDataTable({ data }: CashFlowDataTableProps) {
  return (
    <DataTable
      columns={cashFlowColumns}
      data={data}
      filterBy={{
        key: 'code',
        label: 'code',
      }}
    >
      <SheetProvider>
        <CashFlowCreateSheet />
      </SheetProvider>
    </DataTable>
  );
}
