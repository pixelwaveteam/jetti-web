import { FinancialData, financialColumns } from '@/app/(in)/financial/columns';
import { DataTable } from '@/components/data-table';

interface FinancialDataTableProps {
  data: FinancialData[];
}

export function FinancialDataTable({ data }: FinancialDataTableProps) {
  return (
    <DataTable
      columns={financialColumns}
      data={data}
      filterBy={{
        key: 'name',
        label: 'nome',
      }}
    />
  );
}
