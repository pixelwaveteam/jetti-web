import {
  CashFlowDataTable,
  cashFlowColumns,
} from '@/app/(in)/cash-flows/columns';
import { CashFlowCreateSheet } from '@/app/(in)/cash-flows/create/create-sheet';
import { DataTable } from '@/components/data-table';
import { SheetProvider } from '@/providers/sheet-provider';

interface CashFlowDataTableProps {
  data: CashFlowDataTable[];
}

export function CashFlowDataTable({ data }: CashFlowDataTableProps) {
  return (
    <DataTable
      columns={cashFlowColumns}
      data={data}
      filterBy={[
        {
          key: 'terminal',
          label: 'código de terminal',
        },
        {
          key: 'createdAt',
          label: 'intervalo',
          isDate: true
        }
      ]}
    >
      <SheetProvider>
        <CashFlowCreateSheet />
      </SheetProvider>
    </DataTable>
  );
}
