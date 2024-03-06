import { Metadata } from 'next';

import { fetchEstablishments } from '@/app/(in)/establishments/actions/fetch-establishments';
import { EstablishmentDataTable } from '@/app/(in)/establishments/data-table';
import { fetchOrganizations } from '@/app/(in)/organizations/actions/fetch-organizations';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { PageContainer } from '@/components/page-container';
import { EstablishmentProvider } from '@/providers/establishment-provider';
import { getServerSession } from 'next-auth';
import { fetchTerminals } from '../terminals/actions/fetch-terminals';
import { fetchEstablishmentAddress } from './actions/fetch-establishment-address';

export const metadata: Metadata = {
  title: 'Locais',
  description: 'Locais onde estão localizados os terminais.',
};

export default async function Establishments() {
  const session = await getServerSession(authOptions);

  const rawEstablishments = await fetchEstablishments();

  const terminals = await fetchTerminals();

  const establishments = []

  for(const rawEstablishment of rawEstablishments) {
    if(!session?.user.organizationsId.includes(rawEstablishment.organizationId)) {
      continue
    }

    let establishment = {...rawEstablishment}
    
    const establishmentAddress = await fetchEstablishmentAddress(rawEstablishment.id);

    if(establishmentAddress) {
      const {establishmentId: _, id: __,...restructuredEstablishmentAddress} = establishmentAddress
  
      establishment = {...establishment, ...restructuredEstablishmentAddress}
    }

    const terminalsTotal = terminals.filter(terminal => terminal.establishmentId === rawEstablishment.id).length

    establishments.push({...establishment, terminalsTotal})
  }

  const organizations = (await fetchOrganizations()).filter(({ id }) => session?.user.organizationsId.includes(id));

  return (
    <PageContainer title='Locais'>
      <EstablishmentProvider initialData={{ organizations }}>
        <EstablishmentDataTable data={establishments} />
      </EstablishmentProvider>
    </PageContainer>
  );
}
