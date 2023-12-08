import { Metadata } from 'next';

import { OrganizationDataTable } from '@/app/(in)/organizations/data-table';
import { PageContainer } from '@/components/page-container';

export const metadata: Metadata = {
  title: 'Organização',
  description: 'Administrar organizações parceiras.',
};

export default function Organizations() {
  return (
    <PageContainer title='Organizações'>
      <OrganizationDataTable />
    </PageContainer>
  );
}
