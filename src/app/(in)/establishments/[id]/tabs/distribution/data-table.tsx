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
  jettiPercentageOnDistribution,
  establishmentPercentageOnDistribution,
}: EstablishmentDistributionDataTableProps) {
  const columns = establishmentDistributionColumns(jettiPercentageOnDistribution, establishmentPercentageOnDistribution);

  return (
    <DataTable
      columns={columns}
      data={data}
      globalFiltering
    />
  );
}
