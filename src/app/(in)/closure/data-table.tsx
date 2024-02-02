
import { DataTable } from '@/components/data-table';
import { ClosureDataTableData, closureColumns } from './columns';

interface ClosureDataTableProps {
  data: ClosureDataTableData[];
}

export async function ClosureDataTable({
  data,
}: ClosureDataTableProps) {
  return (
    <DataTable 
      columns={closureColumns} 
      filterBy={[
        {
          key: 'establishment',
          label: 'locais',
          searchableSelect: true,
          options: [],
        },
        {
          key: 'state',
          label: 'estados',
          searchableSelect: true,
          options: [],
        },
        {
          key: 'operator',
          label: 'operadores',
          searchableSelect: true,
          options: [],
        },
        {
          key: 'date',
          label: 'período',
          isDate: true,
        },
      ]} 
      data={data} 
      globalFiltering
    >
      {/* <SheetProvider>
        <ClosureCreateSheet />
      </SheetProvider> */}
    </DataTable>
  );
}
