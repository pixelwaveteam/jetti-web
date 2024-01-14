import { Metadata } from 'next';

import { CardContentProfile } from '@/app/(in)/profile/card-content';
import { PageContainer } from '@/components/page-container';

export const metadata: Metadata = {
  title: 'Perfil',
  description: 'Perfil do usuário logado.',
};

export default async function Profile() {
  return (
    <PageContainer
      title='Perfil'
      description='Informações e configurações do usuário.'
      goBackUrl={'/dashboard'}
    >
      <CardContentProfile />
    </PageContainer>
  );
}
