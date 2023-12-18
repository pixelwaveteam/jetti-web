import {
  EstablishmentData,
  establishmentColumns,
} from '@/app/(in)/establishments/columns';
import { EstablishmentCreateSheet } from '@/app/(in)/establishments/create/create-sheet';
import { DataTable } from '@/components/data-table';
import { SheetProvider } from '@/providers/sheet-provider';

interface EstablishmentDataTableProps {
  establishments: EstablishmentData[];
}

export function EstablishmentDataTable({
  establishments,
}: EstablishmentDataTableProps) {
  return (
    <DataTable
      columns={establishmentColumns}
      data={establishments}
      filterBy={{
        key: 'name',
        label: 'nome',
      }}
    >
      <SheetProvider>
        <EstablishmentCreateSheet />
      </SheetProvider>
    </DataTable>
  );
}
