'use client';

import { Edit } from 'lucide-react';
import { useContext } from 'react';

import { ProfileFormEdit } from '@/app/(in)/profile/edit/form-edit';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SheetContext } from '@/providers/sheet-provider';

interface ProfileEditSheetProps {
  user: {
    id: string;
    name: string;
    role: 'ADMIN' | 'OPERATOR';
  };
}

export function ProfileEditSheet({ user }: ProfileEditSheetProps) {
  const { show, setShow } = useContext(SheetContext);

  return (
    <Sheet open={show} onOpenChange={setShow}>
      <SheetTrigger asChild>
        <Button variant='secondary' className='flex gap-1' size={'default'}>
          <Edit size={16} />
          Alterar
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Alterar Perfil</SheetTitle>
        </SheetHeader>
        <ProfileFormEdit user={user} />
      </SheetContent>
    </Sheet>
  );
}
