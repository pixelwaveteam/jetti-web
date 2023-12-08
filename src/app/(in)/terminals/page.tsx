import { Metadata } from 'next';

import { TerminalDataTable } from '@/app/(in)/terminals/data-table';
import { PageContainer } from '@/components/page-container';

export const metadata: Metadata = {
  title: 'Terminais',
  description: 'Administrar terminais de jogos.',
};

export default function Terminals() {
  return (
    <PageContainer title='Terminais'>
      <TerminalDataTable terminals={[]} />
    </PageContainer>
  );
}
