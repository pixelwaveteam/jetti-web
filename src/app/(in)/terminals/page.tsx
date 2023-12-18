import { Metadata } from 'next';

import { fetchTerminals } from '@/app/(in)/terminals/actions/fetch-terminals';
import { TerminalDataTable } from '@/app/(in)/terminals/data-table';
import { PageContainer } from '@/components/page-container';

export const metadata: Metadata = {
  title: 'Terminais',
  description: 'Administrar terminais de interfaces.',
};

export default async function Terminals() {
  const terminals = await fetchTerminals();

  return (
    <PageContainer title='Terminais'>
      <TerminalDataTable data={terminals} />
    </PageContainer>
  );
}
