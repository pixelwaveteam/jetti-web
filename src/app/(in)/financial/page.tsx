import { Metadata } from 'next';

import { PageContainer } from '@/components/page-container';

export const metadata: Metadata = {
  title: 'Financeiro',
  description: 'Relatório financeiro de leituras.',
};

export default function Financial() {
  return (
    <PageContainer title='Financeiro'>
      <span>Relátório financeiro</span>
    </PageContainer>
  );
}
