import { Metadata } from 'next';

import { EstablishmentDataTable } from '@/app/(in)/establishments/data-table';
import { PageContainer } from '@/components/page-container';

export const metadata: Metadata = {
  title: 'Locais',
  description: 'Locais onde estão localizados os terminais.',
};

export default function Establishments() {
  return (
    <PageContainer title='Locais'>
      <EstablishmentDataTable establishments={[]} />
    </PageContainer>
  );
}
