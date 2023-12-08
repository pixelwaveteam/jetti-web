import { Metadata } from 'next';

import { UserDataTable } from '@/app/(in)/users/data-table';
import { PageContainer } from '@/components/page-container';

export const metadata: Metadata = {
  title: 'Usuários',
  description: 'Administrar usuários com acesso a aplicação.',
};

export default function Users() {
  return (
    <PageContainer title='Usuários'>
      <UserDataTable users={[]} />
    </PageContainer>
  );
}
