import {
  EstablishmentDistributionDataTableData,
  establishmentDistributionColumns,
} from '@/app/(in)/establishments/[id]/tabs/distribution/columns';
import { DataTable } from '@/components/data-table';

interface EstablishmentDistributionDataTableProps {
  data: EstablishmentDistributionDataTableData[];
  jettiPercentageOnDistribution: number, 
  establishmentPercentageOnDistribution: number
}

export function EstablishmentDistributionDataTable({
  data,
}: EstablishmentDistributionDataTableProps) {
  return (
    <DataTable
      columns={establishmentDistributionColumns}
      data={data}
      globalFiltering
    />
  );
}
