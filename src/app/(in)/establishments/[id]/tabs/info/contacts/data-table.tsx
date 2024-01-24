import { EstablishmentContactData, establishmentContactColumns } from '@/app/(in)/establishments/[id]/tabs/info/contacts/columns';
import { EstablishmentContactCreateSheet } from '@/app/(in)/establishments/[id]/tabs/info/contacts/create/create-sheet';
import { DataTable } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { SheetProvider } from '@/providers/sheet-provider';
import { Plus } from 'lucide-react';

interface EstablishmentContactDataTableProps {
  data: EstablishmentContactData[];
}

export function EstablishmentContactDataTable({
  data,
}: EstablishmentContactDataTableProps) {
  const establishmentId = data[0].establishmentId;

  return (
    <DataTable
      columns={establishmentContactColumns}
      data={data}
      filterBy={[{
        key: 'name',
        label: 'nome',
      }]}
    >
      <SheetProvider>
        <EstablishmentContactCreateSheet establishmentId={establishmentId}>
          <Button variant='secondary' className='flex gap-1' size={'default'}>
            <Plus size={16} />
            <span className='hidden md:block'>Contato</span>
          </Button>
        </EstablishmentContactCreateSheet>
      </SheetProvider>
    </DataTable>
  );
}
