'use client';

import { Edit } from 'lucide-react';
import { useContext } from 'react';

import { User } from '@/app/(in)/users/columns';
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
import { UserOrganizationsFormEdit } from './tabs/organizations/form-edit';

interface UserEditSheetProps {
  user: User;
}

export function UserEditSheet({ user }: UserEditSheetProps) {
  const { show, setShow } = useContext(SheetContext);

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
            <TabsTrigger value='distribution'>
              Organizações
            </TabsTrigger>
          </TabsList>
          <TabsContent value='info'>
            <UserInfoFormEdit user={user} />
          </TabsContent>
          <TabsContent value='distribution'>
            {/* <TabDistribution establishment={establishment} /> */}
            <UserOrganizationsFormEdit user={user} />
          </TabsContent>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
