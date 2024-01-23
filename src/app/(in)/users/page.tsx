import { Metadata } from 'next';

import { fetchUsers } from '@/app/(in)/users/actions/fetch-users';
import { UserDataTable } from '@/app/(in)/users/data-table';
import { PageContainer } from '@/components/page-container';
import { UserProvider } from '@/providers/user-provider';
import { fetchOrganizations } from '../organizations/actions/fetch-organizations';

export const metadata: Metadata = {
  title: 'Usuários',
  description: 'Administrar usuários com acesso a aplicação.',
};

export default async function Users() {
  const users = await fetchUsers();
  const organizations = await fetchOrganizations();

  return (
    <PageContainer title='Usuários'>
      <UserProvider
        initialData={{ organizations }}
      >
        <UserDataTable data={users} />
      </UserProvider>
    </PageContainer>
  );
}
