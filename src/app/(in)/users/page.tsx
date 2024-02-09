import { Metadata } from 'next';

import { fetchEstablishments } from '@/app/(in)/establishments/actions/fetch-establishments';
import { fetchUsers } from '@/app/(in)/users/actions/fetch-users';
import { PageContainer } from '@/components/page-container';
import { UserProvider } from '@/providers/user-provider';

import { fetchOrganizations } from '../organizations/actions/fetch-organizations';
import { fetchUserEstablishments } from './actions/fetch-user-establishments';
import { fetchUserOrganizations } from './actions/fetch-user-organizations';
import { UserDataTableData } from './columns';
import { UserDataTable } from './data-table';

export const metadata: Metadata = {
  title: 'Usuários',
  description: 'Administrar usuários com acesso a aplicação.',
};

export default async function Users() {
  const rawUsers = await fetchUsers();
  const organizations = await fetchOrganizations();
  const establishments = await fetchEstablishments();

  const users = [];

  for (const rawUser of rawUsers) {
    const user = rawUser as UserDataTableData;

    const userOrganizations = await fetchUserOrganizations(rawUser.id);

    user.organizations = userOrganizations || [];

    const userEstablishments = await fetchUserEstablishments(rawUser.id);

    user.establishments = userEstablishments || [];

    users.push(user);
  }

  return (
    <PageContainer title='Usuários'>
      <UserProvider initialData={{ organizations, establishments }}>
        <UserDataTable data={users} />
      </UserProvider>
    </PageContainer>
  );
}
