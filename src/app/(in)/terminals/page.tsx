import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import { fetchEstablishments } from '@/app/(in)/establishments/actions/fetch-establishments';
import { fetchInterfaces } from '@/app/(in)/interfaces/actions/fetch-interfaces';
import { fetchOrganizations } from '@/app/(in)/organizations/actions/fetch-organizations';
import { fetchTerminals } from '@/app/(in)/terminals/actions/fetch-terminals';
import { TerminalDataTable } from '@/app/(in)/terminals/data-table';
import { fetchUserTerminals } from '@/app/(in)/users/actions/fetch-user-terminals';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { PageContainer } from '@/components/page-container';
import { TerminalProvider } from '@/providers/terminal-provider';

import { fetchEstablishmentAddress } from '../establishments/actions/fetch-establishment-address';
import { TerminalDataTableData } from './columns';

export const metadata: Metadata = {
  title: 'Terminais',
  description: 'Administrar terminais de interfaces.',
};

export default async function Terminals() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const { user } = session;

  const rawTerminals = await fetchTerminals();
  const organizations = await fetchOrganizations();
  const establishments = await fetchEstablishments();
  const interfaces = await fetchInterfaces();
  const userTerminals = await fetchUserTerminals(user.id);

  const terminals = [];

  console.log('rawTerminals', rawTerminals);

  for (const rawTerminal of rawTerminals) {
    const terminal: TerminalDataTableData = { ...rawTerminal };

    const establishmentAddress = await fetchEstablishmentAddress(
      rawTerminal.establishmentId
    );

    if (establishmentAddress) {
      terminal.establishmentState = establishmentAddress.state;
    }

    const establishmentName = establishments.find(
      (establishment) => establishment.id === rawTerminal.establishmentId
    )?.name;

    if (establishmentName) {
      terminal.establishmentName = establishmentName;
    }

    const interFace = interfaces.find(
      (interFace) => interFace.id === rawTerminal.interfaceId
    );

    if (interFace) {
      terminal.interfaceName = interFace.name;
    }

    terminals.push(terminal);
  }

  const allowedTerminals = terminals.filter(({ id }) =>
    userTerminals.some(({ terminalId }) => terminalId === id)
  );

  console.log('allowedTerminals', allowedTerminals);

  return (
    <PageContainer title='Terminais'>
      <TerminalProvider
        initialData={{ organizations, establishments, interfaces }}
      >
        <TerminalDataTable data={allowedTerminals} />
      </TerminalProvider>
    </PageContainer>
  );
}
