import { Metadata } from 'next';

import { UserDataTable } from '@/app/(in)/users/data-table';
import { PageContainer } from '@/components/page-container';

export const metadata: Metadata = {
  title: 'Perfil',
  description: 'Perfil do usuário logado.',
};

export default function Profile() {
  return (
    <PageContainer title='Perfil'>
      <UserDataTable users={[]} />
    </PageContainer>
  );
}
