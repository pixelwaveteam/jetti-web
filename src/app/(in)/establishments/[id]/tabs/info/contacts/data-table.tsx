import {
  EstablishmentContactDataTableData,
  establishmentContactColumns,
} from '@/app/(in)/establishments/[id]/tabs/info/contacts/columns';
import { DataTable } from '@/components/data-table';

interface EstablishmentContactDataTableProps {
  data: EstablishmentContactDataTableData[];
}

export function EstablishmentContactDataTable({
  data,
}: EstablishmentContactDataTableProps) {
  return (
    <DataTable
      columns={establishmentContactColumns}
      data={data}
      globalFiltering
    />
  );
}
