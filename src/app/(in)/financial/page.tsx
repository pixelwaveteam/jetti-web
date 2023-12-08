import { Metadata } from 'next';

import { FinancialDataTable } from '@/app/(in)/financial/data-table';
import { PageContainer } from '@/components/page-container';

export const metadata: Metadata = {
  title: 'Financeiro',
  description: 'Relatório financeiro de leituras.',
};

export default function Financial() {
  return (
    <PageContainer title='Financeiro'>
      <FinancialDataTable data={[]} />
    </PageContainer>
  );
}
