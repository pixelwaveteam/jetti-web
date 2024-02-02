import { EstablishmentContactCreateSheet } from '@/app/(in)/establishments/[id]/tabs/info/contacts/create/create-sheet';
import { EstablishmentContactDataTable } from '@/app/(in)/establishments/[id]/tabs/info/contacts/data-table';
import { EmptyState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SheetProvider } from '@/providers/sheet-provider';
import { Plus } from 'lucide-react';
import { EstablishmentContactDataTableData } from './columns';

interface EstablishmentAddressProps {
  establishmentId: string;
  establishmentContacts?: EstablishmentContactDataTableData[];
}

export function EstablishmentContacts({
  establishmentId,
  establishmentContacts,
}: EstablishmentAddressProps) {
  if (!establishmentContacts || establishmentContacts.length === 0) {
    return (
      <SheetProvider>
        <EstablishmentContactCreateSheet establishmentId={establishmentId}>
          <EmptyState label='Criar contato' />
        </EstablishmentContactCreateSheet>
      </SheetProvider>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between items-center'>
          <div className='space-y-2'>
            <CardTitle>Contatos</CardTitle>
            <CardDescription>
              Informações de contato do local como telefone e e-mail
            </CardDescription>
          </div>
          <SheetProvider>
            <EstablishmentContactCreateSheet establishmentId={establishmentId}>
              <Button
                variant='secondary'
                className='flex gap-1'
                size={'default'}
              >
                <Plus size={16} />
                <span className='hidden md:block'>Contato</span>
              </Button>
            </EstablishmentContactCreateSheet>
          </SheetProvider>
        </div>
      </CardHeader>
      <CardContent>
        <EstablishmentContactDataTable data={establishmentContacts} />
      </CardContent>
    </Card>
  );
}
