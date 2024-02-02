import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { PageContainer } from '@/components/page-container';
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

  const closures: ClosureDataTableData[] = [{

  }] 

  return (
    <PageContainer title='Fechamentos'>
      <ClosureDataTable data={closures} />
    </PageContainer>
  );
}
