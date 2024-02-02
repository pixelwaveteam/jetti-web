import {
  EstablishmentDistributionDataTableData,
  establishmentDistributionColumns,
} from '@/app/(in)/establishments/[id]/tabs/distribution/columns';
import { DataTable } from '@/components/data-table';

interface EstablishmentDistributionDataTableProps {
  data: EstablishmentDistributionDataTableData[];
}

export function EstablishmentDistributionDataTable({
  data,
}: EstablishmentDistributionDataTableProps) {
  const percentageTotal = data.reduce((acc, item) => {
    return acc + item.percentage;
  }, 0);

  const pencentageJetti = 10000 - percentageTotal;

  const mockJettiData = {
    id: 'jetti',
    establishmentId: 'jetti',
    name: 'jetti',
    description: 'jetti',
    percentage: pencentageJetti,
  };

  data.push(mockJettiData);

  return (
    <DataTable
      columns={establishmentDistributionColumns}
      data={data}
      globalFiltering
    />
  );
}
