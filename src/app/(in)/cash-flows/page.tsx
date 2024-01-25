import { Metadata } from 'next';

import { fetchCashFlows } from '@/app/(in)/cash-flows/actions/fetch-cash-flows';
import { CashFlowDataTable } from '@/app/(in)/cash-flows/data-table';
import { Terminal, fetchTerminals } from '@/app/(in)/terminals/actions/fetch-terminals';
import { PageContainer } from '@/components/page-container';
import { CashFlowProvider } from '@/providers/cash-flow-provider';
import { fetchEstablishment } from '../establishments/actions/fetch-establishment';
import { fetchEstablishments } from '../establishments/actions/fetch-establishments';
import { fetchInterface } from '../interfaces/actions/fetch-interface';
import { CashFlowDataTableData } from './columns';

export const metadata: Metadata = {
  title: 'Leituras',
  description: 'Administrar leituras dos terminais.',
};

export default async function CashFlows() {
  const [rawCashFlows, rawTerminals, establishments] = await Promise.all([
    fetchCashFlows(),
    fetchTerminals(),
    fetchEstablishments()
  ]); 

  const cashFlows = []

  for(const rawCashFlow of rawCashFlows) {
    let cashFlow: CashFlowDataTableData = {...rawCashFlow, cashFlowCode: rawCashFlow.id.slice(0, 8) };

    const cashFlowEstablishmentId = rawTerminals.find(({ code }) => String(code) === rawCashFlow.terminal)?.establishmentId

    if(cashFlowEstablishmentId) {
      const { name: establishmentName } = await fetchEstablishment(cashFlowEstablishmentId)

      cashFlow.establishment = establishmentName
    }

    cashFlows.push(cashFlow)
  }

  const terminals = [];

  for(const rawTerminal of rawTerminals) {
    const terminal = rawTerminal as (Terminal & {
      interfaceName?: string;
    })

    const fetchedInterface = await fetchInterface(rawTerminal.interfaceId);

    if(fetchedInterface) {
      terminal.interfaceName = fetchedInterface.name
    }

    terminals.push(terminal)
  }

  return (
    <PageContainer title='Leituras'>
      <CashFlowProvider initialData={{ terminals, establishments }}>
        <CashFlowDataTable data={cashFlows} />
      </CashFlowProvider>
    </PageContainer>
  );
}
