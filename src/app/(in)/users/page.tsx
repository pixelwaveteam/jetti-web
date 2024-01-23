import { Metadata } from 'next';

import { fetchUsers } from '@/app/(in)/users/actions/fetch-users';
import { UserDataTable } from '@/app/(in)/users/data-table';
import { PageContainer } from '@/components/page-container';
import { UserProvider } from '@/providers/user-provider';
import { fetchOrganizations } from '../organizations/actions/fetch-organizations';
import { fetchUserOrganizations } from './actions/fetch-user-organizations';

export const metadata: Metadata = {
  title: 'Usuários',
  description: 'Administrar usuários com acesso a aplicação.',
};

export default async function Users() {
  const rawUsers = await fetchUsers();
  const organizations = await fetchOrganizations();

  const users = []

  for(const user of rawUsers) {
    try {
      const userOrganizations = await fetchUserOrganizations(user.id);
  
      users.push({ ...user, userOrganizations })
    } catch {
      users.push({ ...user, userOrganizations: [] })
    }
  }

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
