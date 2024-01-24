import { Metadata } from 'next';

import { fetchCashFlows } from '@/app/(in)/cash-flows/actions/fetch-cash-flows';
import { CashFlowDataTable } from '@/app/(in)/cash-flows/data-table';
import { fetchTerminals } from '@/app/(in)/terminals/actions/fetch-terminals';
import { PageContainer } from '@/components/page-container';
import { CashFlowProvider } from '@/providers/cash-flow-provider';
import { fetchEstablishment } from '../establishments/actions/fetch-establishment';
import { CashFlowDataTable as CashFlowDataTableType } from './columns';

export const metadata: Metadata = {
  title: 'Leituras',
  description: 'Administrar leituras dos terminais.',
};

export default async function CashFlows() {
  const [rawCashFlows, terminals] = await Promise.all([
    fetchCashFlows(),
    fetchTerminals(),
  ]); 

  const cashFlows = []

  for(const rawCashFlow of rawCashFlows) {
    let cashFlow: CashFlowDataTableType = {...rawCashFlow, cashFlowCode: rawCashFlow.id.slice(0, 8) };

    const cashFlowEstablishmentId = terminals.find(({ code }) => code === rawCashFlow.terminal)?.establishmentId

    if(cashFlowEstablishmentId) {
      const { name: establishmentName } = await fetchEstablishment(cashFlowEstablishmentId)

      cashFlow.establishment = establishmentName
    }

    cashFlows.push(cashFlow)
  }

  return (
    <PageContainer title='Leituras'>
      <CashFlowProvider initialData={{ terminals }}>
        <CashFlowDataTable data={cashFlows} />
      </CashFlowProvider>
    </PageContainer>
  );
}
