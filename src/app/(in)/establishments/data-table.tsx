import {
  EstablishmentData,
  establishmentColumns,
} from '@/app/(in)/establishments/columns';
import { EstablishmentCreateSheet } from '@/app/(in)/establishments/create/create-sheet';
import { DataTable } from '@/components/data-table';
import { SheetProvider } from '@/providers/sheet-provider';

interface EstablishmentDataTableProps {
  data: EstablishmentData[];
}

export function EstablishmentDataTable({ data }: EstablishmentDataTableProps) {
  return (
    <DataTable
      columns={establishmentColumns}
      data={data}
      filterBy={[{
        key: 'terminalsTotal',
        label: 'terminais',
        isNumber: true
      }]}
      globalFiltering
    >
      <SheetProvider>
        <EstablishmentCreateSheet />
      </SheetProvider>
    </DataTable>
  );
}
