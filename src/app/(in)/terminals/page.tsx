import { Metadata } from 'next';

import { fetchEstablishments } from '@/app/(in)/establishments/actions/fetch-establishments';
import { fetchInterfaces } from '@/app/(in)/interfaces/actions/fetch-interfaces';
import { fetchOrganizations } from '@/app/(in)/organizations/actions/fetch-organizations';
import { fetchTerminals } from '@/app/(in)/terminals/actions/fetch-terminals';
import { TerminalDataTable } from '@/app/(in)/terminals/data-table';
import { PageContainer } from '@/components/page-container';
import { TerminalProvider } from '@/providers/terminal-provider';

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

  for(const terminal of rawTerminals) {
    const establishment = establishments.find(establishment => establishment.id === terminal.establishmentId)

    if(!establishment) {
      throw new Error(`No establishment found with id ${terminal.establishmentId}`)
    }

    terminals.push({...terminal, establishment: establishment.name})
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
