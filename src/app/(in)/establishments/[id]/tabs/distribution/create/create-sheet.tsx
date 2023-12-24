'use client';

import { ReactNode, useContext } from 'react';

import { EstablishmentDistributionFormCreate } from '@/app/(in)/establishments/[id]/tabs/distribution/create/form-create';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SheetContext } from '@/providers/sheet-provider';

interface EstablishmentDistributionCreateSheet {
  establishmentId: string;
  children: ReactNode;
}

export function EstablishmentDistributionCreateSheet({
  establishmentId,
  children,
}: EstablishmentDistributionCreateSheet) {
  const { show, setShow } = useContext(SheetContext);

  return (
    <Sheet open={show} onOpenChange={setShow}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Criar Distribuição</SheetTitle>
        </SheetHeader>
        <EstablishmentDistributionFormCreate
          establishmentId={establishmentId}
        />
      </SheetContent>
    </Sheet>
  );
}
