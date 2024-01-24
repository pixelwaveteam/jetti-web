'use client';

import { Edit } from 'lucide-react';
import { useContext } from 'react';

import { UserInfoFormEdit } from '@/app/(in)/users/edit/tabs/Info/form-edit';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SheetContext } from '@/providers/sheet-provider';
import { User } from '@/types/user';
import { useSession } from 'next-auth/react';
import { UserOrganizationsFormEdit } from './tabs/organizations/form-edit';

interface UserOrganization {
  id: string
  organizationId: string;
  userId: string;
}

export type UserRelations = User & {
  organizations: UserOrganization[]
}

interface UserEditSheetProps {
  user: UserRelations;
}

export function UserEditSheet({ user }: UserEditSheetProps) {
  const { show, setShow } = useContext(SheetContext);
  const { data: session } = useSession();

  const role = session?.user?.role || 'OPERATOR';

  return (
    <Sheet open={show} onOpenChange={setShow}>
      <SheetTrigger asChild>
        <Button variant='ghost' className='flex gap-1' size={'icon'}>
          <Edit size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Alterar Usuário</SheetTitle>
        </SheetHeader>
        <Tabs defaultValue='info' className='w-full mt-4'>
          <TabsList>
            <TabsTrigger value='info'>Informações</TabsTrigger>
            {
              role === 'ADMIN' && (
                <TabsTrigger value='organizations'>
                  Organizações
                </TabsTrigger>
              )
            }
          </TabsList>
          <TabsContent value='info'>
            <UserInfoFormEdit user={user} />
          </TabsContent>
          {
            role === 'ADMIN' && (
              <TabsContent value='organizations'>
                <UserOrganizationsFormEdit user={user} />
              </TabsContent>
            )
          }
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
