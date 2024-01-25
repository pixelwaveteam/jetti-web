import { Plus } from 'lucide-react';

import { EstablishmentDistributionDataTableData, establishmentDistributionColumns } from '@/app/(in)/establishments/[id]/tabs/distribution/columns';
import { EstablishmentDistributionCreateSheet } from '@/app/(in)/establishments/[id]/tabs/distribution/create/create-sheet';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { SheetProvider } from '@/providers/sheet-provider';

interface EstablishmentDistributionDataTableProps {
  data: EstablishmentDistributionDataTableData[];
}

export function EstablishmentDistributionDataTable({
  data,
}: EstablishmentDistributionDataTableProps) {
  const establishmentId = data[0].establishmentId;

  return (
    <DataTable
      columns={establishmentDistributionColumns}
      data={data}
      filterBy={[{
        key: 'name',
        label: 'nome',
      }]}
    >
      <SheetProvider>
        <EstablishmentDistributionCreateSheet establishmentId={establishmentId}>
          <Button variant='secondary' className='flex gap-1' size={'default'}>
            <Plus size={16} />
            <span className='hidden md:block'>Distributição</span>
          </Button>
        </EstablishmentDistributionCreateSheet>
      </SheetProvider>
    </DataTable>
  );
}
