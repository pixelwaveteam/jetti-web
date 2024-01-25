import { Metadata } from 'next';

import { fetchEstablishments } from '@/app/(in)/establishments/actions/fetch-establishments';
import { fetchInterfaces } from '@/app/(in)/interfaces/actions/fetch-interfaces';
import { fetchOrganizations } from '@/app/(in)/organizations/actions/fetch-organizations';
import { fetchTerminals } from '@/app/(in)/terminals/actions/fetch-terminals';
import { TerminalDataTable } from '@/app/(in)/terminals/data-table';
import { PageContainer } from '@/components/page-container';
import { TerminalProvider } from '@/providers/terminal-provider';
import { fetchInitialCashFlow } from '../cash-flows/actions/fetch-initial-cash-flow';
import { fetchEstablishmentAddress } from '../establishments/actions/fetch-establishment-address';
import { TerminalDataTableData } from './columns';

export const metadata: Metadata = {
  title: 'Terminais',
  description: 'Administrar terminais de interfaces.',
};

export default async function Terminals() {
  const rawTerminals = await fetchTerminals();
  const organizations = await fetchOrganizations();
  const establishments = await fetchEstablishments();
  const interfaces = await fetchInterfaces();

  const terminals = [];

  for(const rawTerminal of rawTerminals) {
    const terminal: TerminalDataTableData = {...rawTerminal};

    const establishmentAddress = await fetchEstablishmentAddress(rawTerminal.establishmentId)

    if(establishmentAddress) {
      terminal.establishmentState = establishmentAddress.state
    }

    const establishmentName = establishments.find(establishment => establishment.id === rawTerminal.establishmentId)?.name

    if(establishmentName) {
      terminal.establishmentName = establishmentName
    }


    const interFace = interfaces.find(interFace => interFace.id === rawTerminal.interfaceId)

    if(interFace) {
      terminal.interfaceName = interFace.name
    }

    try {
      const initialCashFlow = await fetchInitialCashFlow(rawTerminal.id)
      
      console.log({initialCashFlow})

      if(initialCashFlow) {
        terminal.cashIn = initialCashFlow.cashIn;
        terminal.cashOut = initialCashFlow.cashOut;
      }
    } catch(err) {
      console.error({err})
    }

    terminals.push(terminal)
  }

  return (
    <PageContainer title='Terminais'>
      <TerminalProvider
        initialData={{ organizations, establishments, interfaces }}
      >
        <TerminalDataTable data={terminals} />
      </TerminalProvider>
    </PageContainer>
  );
}
