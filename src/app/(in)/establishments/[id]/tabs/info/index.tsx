import { EstablishmentAddress } from '@/app/(in)/establishments/[id]/tabs/info/address';
import { EstablishmentContacts } from '@/app/(in)/establishments/[id]/tabs/info/contacts';
import { fetchEstablishmentAddress } from '@/app/(in)/establishments/actions/fetch-establishment-address';
import { fetchEstablishmentContacts } from '@/app/(in)/establishments/actions/fetch-establishment-contacts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Establishment } from '../../../actions/fetch-establishments';

interface TabInfoProps {
  establishment: Establishment;
}

export async function TabInfo({ establishment }: TabInfoProps) {
  const establishmentAddress = await fetchEstablishmentAddress(
    establishment.id
  );

  const establishmentContacts = await fetchEstablishmentContacts(
    establishment.id
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações gerais</CardTitle>
        <CardDescription>
          Informações gerais sobre o local como endereço e contatos
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <EstablishmentAddress
          establishmentAddress={establishmentAddress}
          establishmentId={establishment.id}
        />
        <EstablishmentContacts
          establishmentContacts={establishmentContacts}
          establishmentId={establishment.id}
        />
      </CardContent>
    </Card>
  );
}
