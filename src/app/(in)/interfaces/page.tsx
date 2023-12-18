import { Metadata } from 'next';

import { fetchInterfaces } from '@/app/(in)/interfaces/actions/fetch-interfaces';
import { InterfaceDataTable } from '@/app/(in)/interfaces/data-table';
import { PageContainer } from '@/components/page-container';

export const metadata: Metadata = {
  title: 'Interfaces',
  description: 'Administrar interfaces dos terminais.',
};

export default async function Interfaces() {
  const interfaces = await fetchInterfaces();

  return (
    <PageContainer title='Interfaces'>
      <InterfaceDataTable data={interfaces} />
    </PageContainer>
  );
}
