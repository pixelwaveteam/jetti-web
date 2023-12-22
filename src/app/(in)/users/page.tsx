import { Metadata } from 'next';

import { fetchUsers } from '@/app/(in)/users/actions/fetch-users';
import { UserDataTable } from '@/app/(in)/users/data-table';
import { PageContainer } from '@/components/page-container';

export const metadata: Metadata = {
  title: 'Usuários',
  description: 'Administrar usuários com acesso a aplicação.',
};

export default async function Users() {
  const users = await fetchUsers();

  return (
    <PageContainer title='Usuários'>
      <UserDataTable data={users} />
    </PageContainer>
  );
}
