'use client';

import { ReactNode, useContext } from 'react';

import { EstablishmentAddressFormCreate } from '@/app/(in)/establishments/[id]/tabs/info/address/create/form-create';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SheetContext } from '@/providers/sheet-provider';

interface EstablishmentAddressCreateSheet {
  establishmentId: string;
  children: ReactNode;
}

export function EstablishmentAddressCreateSheet({
  establishmentId,
  children,
}: EstablishmentAddressCreateSheet) {
  const { show, setShow } = useContext(SheetContext);

  return (
    <Sheet open={show} onOpenChange={setShow}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Criar Endereço</SheetTitle>
        </SheetHeader>
        <EstablishmentAddressFormCreate establishmentId={establishmentId} />
      </SheetContent>
    </Sheet>
  );
}
