import { Metadata } from 'next';

import { fetchCashFlows } from '@/app/(in)/cash-flows/actions/fetch-cash-flows';
import { CashFlowDataTable } from '@/app/(in)/cash-flows/data-table';
import { fetchTerminals } from '@/app/(in)/terminals/actions/fetch-terminals';
import { PageContainer } from '@/components/page-container';
import { CashFlowProvider } from '@/providers/cash-flow-provider';

export const metadata: Metadata = {
  title: 'Leituras',
  description: 'Administrar leituras dos terminais.',
};

export default async function CashFlows() {
  const cashFlows = await fetchCashFlows();
  const terminals = await fetchTerminals();

  return (
    <PageContainer title='Leituras'>
      <CashFlowProvider initialData={{ terminals }}>
        <CashFlowDataTable data={cashFlows} />
      </CashFlowProvider>
    </PageContainer>
  );
}
