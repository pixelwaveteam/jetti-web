import { Metadata } from 'next';

import { fetchEstablishments } from '@/app/(in)/establishments/actions/fetch-establishments';
import { EstablishmentDataTable } from '@/app/(in)/establishments/data-table';
import { fetchOrganizations } from '@/app/(in)/organizations/actions/fetch-organizations';
import { PageContainer } from '@/components/page-container';
import { EstablishmentProvider } from '@/providers/establishment-provider';

export const metadata: Metadata = {
  title: 'Locais',
  description: 'Locais onde estão localizados os terminais.',
};

export default async function Establishments() {
  const establishments = await fetchEstablishments();
  const organizations = await fetchOrganizations();

  return (
    <PageContainer title='Locais'>
      <EstablishmentProvider initialData={{ organizations }}>
        <EstablishmentDataTable data={establishments} />
      </EstablishmentProvider>
    </PageContainer>
  );
}
