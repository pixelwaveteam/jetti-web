import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { PageContainer } from '@/components/page-container';
import { fetchUser } from '../users/actions/fetch-user';
import { fetchClosures } from './actions/fetch-closures';
import { ClosureDataTableData } from './create/columns';
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

  const rawClosures = (await fetchClosures()).filter(closure => session.user.organizationsId.find(id => closure.organization.id === id));

  const closures = []

  for(const rawClosure of rawClosures) {
    const closure: ClosureDataTableData = {...rawClosure, organizationName: rawClosure.organization.name, date: rawClosure.closure.date}

    const closer = await fetchUser(rawClosure.closure.closerId.value)

    if(closer) {
      closure.closer = closer.name;
    }

    closures.push(closure)
  }

  return (
    <PageContainer title='Fechamentos'>
      <ClosureDataTable data={closures} />
    </PageContainer>
  );
}
