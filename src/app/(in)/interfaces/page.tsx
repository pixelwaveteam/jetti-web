import { Metadata } from 'next';

import { InterfaceDataTable } from '@/app/(in)/interfaces/data-table';
import { PageContainer } from '@/components/page-container';

export const metadata: Metadata = {
  title: 'Interfaces',
  description: 'Administrar interfaces dos terminais.',
};

export default function Interfaces() {
  return (
    <PageContainer title='Interfaces'>
      <InterfaceDataTable interfaces={[]} />
    </PageContainer>
  );
}
