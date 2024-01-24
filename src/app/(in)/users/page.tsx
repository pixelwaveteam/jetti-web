import { Metadata } from 'next';

import { fetchUsers } from '@/app/(in)/users/actions/fetch-users';
import { UserDataTable } from '@/app/(in)/users/data-table';
import { PageContainer } from '@/components/page-container';
import { UserProvider } from '@/providers/user-provider';
import { fetchOrganizations } from '../organizations/actions/fetch-organizations';
import { fetchUserOrganizations } from './actions/fetch-user-organizations';
import { UserData } from './columns';

export const metadata: Metadata = {
  title: 'Usuários',
  description: 'Administrar usuários com acesso a aplicação.',
};

export default async function Users() {
  const rawUsers = await fetchUsers();
  const organizations = await fetchOrganizations();

  const users = []

  for(const rawUser of rawUsers) {
    const user = rawUser as UserData;

    const userOrganizations = (await fetchUserOrganizations(rawUser.id)).map(({ id, props: { organizationId, userId } }) => ({ id, organizationId, userId }));

    user.organizations = userOrganizations || []
    
    users.push(user)
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
