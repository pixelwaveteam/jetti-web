import { Metadata } from 'next';

import { CashFlowDataTable } from '@/app/(in)/cash-flows/data-table';
import { PageContainer } from '@/components/page-container';

export const metadata: Metadata = {
  title: 'Leituras',
  description: 'Administrar usuários com acesso a aplicação.',
};

export default function CashFlows() {
  return (
    <PageContainer title='Leituras'>
      <CashFlowDataTable cashFlows={[]} />
    </PageContainer>
  );
}
