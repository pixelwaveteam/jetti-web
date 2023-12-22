'use client';

import { Edit } from 'lucide-react';
import { useContext } from 'react';

import { User } from '@/app/(in)/users/columns';
import { UserFormEdit } from '@/app/(in)/users/edit/form-edit';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SheetContext } from '@/providers/sheet-provider';

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
          <SheetTitle>Edit User</SheetTitle>
        </SheetHeader>
        <UserFormEdit user={user} />
      </SheetContent>
    </Sheet>
  );
}
