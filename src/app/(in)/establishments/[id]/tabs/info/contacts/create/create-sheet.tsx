'use client';

import { ReactNode, useContext } from 'react';

import { EstablishmentContactFormCreate } from '@/app/(in)/establishments/[id]/tabs/info/contacts/create/form-create';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SheetContext } from '@/providers/sheet-provider';

interface EstablishmentContactCreateSheet {
  establishmentId: string;
  children: ReactNode;
}

export function EstablishmentContactCreateSheet({
  establishmentId,
  children,
}: EstablishmentContactCreateSheet) {
  const { show, setShow } = useContext(SheetContext);

  return (
    <Sheet open={show} onOpenChange={setShow}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Criar Contato</SheetTitle>
        </SheetHeader>
        <EstablishmentContactFormCreate establishmentId={establishmentId} />
      </SheetContent>
    </Sheet>
  );
}
