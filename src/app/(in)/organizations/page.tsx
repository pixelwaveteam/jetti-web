import { Metadata } from 'next';

import { fetchOrganizations } from '@/app/(in)/organizations/actions/fetch-organizations';
import { OrganizationDataTable } from '@/app/(in)/organizations/data-table';
import { PageContainer } from '@/components/page-container';

export const metadata: Metadata = {
  title: 'Organização',
  description: 'Administrar organizações parceiras.',
};

export default async function Organizations() {
  const organizations = await fetchOrganizations();

  return (
    <PageContainer title='Organizações'>
      <OrganizationDataTable data={organizations} />
    </PageContainer>
  );
}
