import { EstablishmentContactCreateSheet } from '@/app/(in)/establishments/[id]/tabs/info/contacts/create/create-sheet';
import { EstablishmentContactDataTable } from '@/app/(in)/establishments/[id]/tabs/info/contacts/data-table';
import { EmptyState } from '@/components/empty-state';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SheetProvider } from '@/providers/sheet-provider';
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
        <CardTitle>Contatos</CardTitle>
        <CardDescription>
          Informações de contato do local como telefone e e-mail
        </CardDescription>
      </CardHeader>
      <CardContent>
        <EstablishmentContactDataTable data={establishmentContacts} />
      </CardContent>
    </Card>
  );
}
