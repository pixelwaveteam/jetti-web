import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import { ChangePasswordSheet } from '@/app/(in)/profile/change-password/change-password-sheet';
import { ProfileEditSheet } from '@/app/(in)/profile/edit/edit-sheet';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { PageContainer } from '@/components/page-container';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { SheetProvider } from '@/providers/sheet-provider';
import { getInitials } from '@/utils/text';

export const metadata: Metadata = {
  title: 'Perfil',
  description: 'Perfil do usuário logado.',
};

export default async function Profile() {
  const session = await getServerSession(authOptions);

  const userProfile = session?.user;

  if (!userProfile) {
    return null;
  }

  const role = userProfile.role === 'ADMIN' ? 'Administrador' : 'Usuário';

  return (
    <PageContainer
      title='Perfil'
      description='Informações e configurações do usuário.'
      goBackUrl={'/dashboard'}
    >
      <Card>
        <CardContent>
          <div className='pt-4 flex gap-24 items-center'>
            <div>
              <Avatar className='h-40 w-40'>
                <AvatarImage src='' />
                <AvatarFallback className='text-5xl'>
                  {getInitials(userProfile.name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className='flex flex-col gap-4 '>
              <div className='flex items-center gap-4'>
                <h3 className='font-bold'>Nome</h3>
                <p className='text-gray-500'>{userProfile.name}</p>
              </div>
              <div className='flex items-center gap-4'>
                <h3 className='font-bold'>Email</h3>
                <p className='text-gray-500'>{userProfile.email}</p>
              </div>
              <div className='flex items-center gap-4'>
                <h3 className='font-bold'>Perfil</h3>
                <p className='text-gray-500'>{role}</p>
              </div>
              <div className='flex items-center gap-4'>
                <SheetProvider>
                  <ProfileEditSheet
                    user={{
                      ...userProfile,
                      isActive: true,
                    }}
                  />
                </SheetProvider>
                <SheetProvider>
                  <ChangePasswordSheet />
                </SheetProvider>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
