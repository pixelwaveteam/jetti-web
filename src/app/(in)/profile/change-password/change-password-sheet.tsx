'use client';

import { useContext } from 'react';

import { ChangePasswordForm } from '@/app/(in)/profile/change-password/form-change-password';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SheetContext } from '@/providers/sheet-provider';
import { SquareAsterisk } from 'lucide-react';

export function ChangePasswordSheet() {
  const { show, setShow } = useContext(SheetContext);

  return (
    <Sheet open={show} onOpenChange={setShow}>
      <SheetTrigger asChild>
        <Button variant='outline' className='flex gap-1' size={'default'}>
          <SquareAsterisk size={16} />
          Mudar Senha
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Mudar Senha</SheetTitle>
        </SheetHeader>
        <ChangePasswordForm />
      </SheetContent>
    </Sheet>
  );
}
