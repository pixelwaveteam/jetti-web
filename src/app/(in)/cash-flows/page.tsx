import { Metadata } from 'next';

import { CashFlowDataTable } from '@/app/(in)/cash-flows/data-table';
import { PageContainer } from '@/components/page-container';

export const metadata: Metadata = {
  title: 'Leituras',
  description: 'Administrar leituras dos terminais.',
};

export default async function CashFlows() {
  return (
    <PageContainer title='Leituras'>
      <CashFlowDataTable cashFlows={[]} />
    </PageContainer>
  );
}
