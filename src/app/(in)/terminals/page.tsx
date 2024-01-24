import { Metadata } from 'next';

import { fetchEstablishments } from '@/app/(in)/establishments/actions/fetch-establishments';
import { fetchInterfaces } from '@/app/(in)/interfaces/actions/fetch-interfaces';
import { fetchOrganizations } from '@/app/(in)/organizations/actions/fetch-organizations';
import { fetchTerminals } from '@/app/(in)/terminals/actions/fetch-terminals';
import { TerminalDataTable } from '@/app/(in)/terminals/data-table';
import { PageContainer } from '@/components/page-container';
import { TerminalProvider } from '@/providers/terminal-provider';
import { fetchEstablishmentAddress } from '../establishments/actions/fetch-establishment-address';
import { TerminalData } from './columns';

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
    const terminal: TerminalData = {...rawTerminal, cashIn: 0, cashOut: 0};

    const establishmentAddress = await fetchEstablishmentAddress(rawTerminal.establishmentId)

    if(establishmentAddress) {
      terminal.establishmentState = establishmentAddress.state
    }

    const interFace = interfaces.find(interFace => interFace.id === rawTerminal.interfaceId)

    if(interFace) {
      terminal.interfaceName = interFace.name
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
