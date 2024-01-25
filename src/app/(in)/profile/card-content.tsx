'use client';

import { useSession } from 'next-auth/react';

import { ChangePasswordSheet } from '@/app/(in)/profile/change-password/change-password-sheet';
import { ProfileEditSheet } from '@/app/(in)/profile/edit/edit-sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { SheetProvider } from '@/providers/sheet-provider';
import { getInitials } from '@/utils/text';

export function CardContentProfile() {
  const { data: session } = useSession();

  if (!session) {
    return null;
  }

  const role = session.user.role === 'ADMIN' ? 'Administrador' : 'Usuário';

  return (
    <Card>
      <CardContent>
        <div className='pt-4 flex gap-24 items-center'>
          <div>
            <Avatar className='h-40 w-40'>
              <AvatarImage src='' />
              <AvatarFallback className='text-5xl'>
                {getInitials(session.user.name)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className='flex flex-col gap-4 '>
            <div className='flex items-center gap-4'>
              <h3 className='font-bold'>Nome</h3>
              <p className='text-gray-500'>{session.user.name}</p>
            </div>
            <div className='flex items-center gap-4'>
              <h3 className='font-bold'>Username</h3>
              <p className='text-gray-500'>{session.user.username}</p>
            </div>
            <div className='flex items-center gap-4'>
              <h3 className='font-bold'>Perfil</h3>
              <p className='text-gray-500'>{role}</p>
            </div>
            <div className='flex items-center gap-4'>
              <SheetProvider>
                <ProfileEditSheet user={session.user} />
              </SheetProvider>
              <SheetProvider>
                <ChangePasswordSheet />
              </SheetProvider>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
