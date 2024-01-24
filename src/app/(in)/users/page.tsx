import { Metadata } from 'next';

import { fetchUsers } from '@/app/(in)/users/actions/fetch-users';
import { UserDataTable } from '@/app/(in)/users/data-table';
import { PageContainer } from '@/components/page-container';
import { UserProvider } from '@/providers/user-provider';
import { fetchOrganizations } from '../organizations/actions/fetch-organizations';
import { fetchTerminals } from '../terminals/actions/fetch-terminals';
import { fetchUserOrganizations } from './actions/fetch-user-organizations';
import { fetchUserTerminals } from './actions/fetch-user-terminals';
import { UserData } from './columns';

export const metadata: Metadata = {
  title: 'Usuários',
  description: 'Administrar usuários com acesso a aplicação.',
};

export default async function Users() {
  const rawUsers = await fetchUsers();
  const organizations = await fetchOrganizations();
  const terminals = await fetchTerminals();

  const users = []

  for(const rawUser of rawUsers) {
    const user = { } as UserData;

    const userOrganizations = await fetchUserOrganizations(rawUser.id)

    user.organizations = userOrganizations || []

    const userTerminals = await fetchUserTerminals(rawUser.id)
    
    user.terminals = userTerminals || []
    
    users.push(user)
  }

  return (
    <PageContainer title='Usuários'>
      <UserProvider
        initialData={{ organizations, terminals }}
      >
        <UserDataTable data={users} />
      </UserProvider>
    </PageContainer>
  );
}
