import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { PageContainer } from '@/components/page-container';
import { fetchOrganization } from '../organizations/actions/fetch-organization';
import { fetchUser } from '../users/actions/fetch-user';
import { fetchClosures } from './actions/fetch-closures';
import { ClosureDataTableData } from './columns';
import { ClosureDataTable } from './data-table';

export const metadata: Metadata = {
  title: 'Fechamento',
  description: 'Administrar fechamentos.',
};

export default async function Closures() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const rawClosures = await fetchClosures();

  const closures = []

  for(const rawClosure of rawClosures) {
    const closure: ClosureDataTableData = {...rawClosure}

    const closer = await fetchUser(rawClosure.closerId)

    if(closer) {
      closure.closer = closer.name;
    }

    const organization = await fetchOrganization(rawClosure.organizationId)

    if(organization) {
      closure.organization = organization.name;
    }

    closures.push(closure)
  }

  return (
    <PageContainer title='Fechamentos'>
      <ClosureDataTable data={closures} />
    </PageContainer>
  );
}
