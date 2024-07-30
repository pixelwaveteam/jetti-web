'use client';

import { ReactNode, useContext } from 'react';

import { EstablishmentDistributionFormCreate } from '@/app/(in)/establishments/[id]/tabs/distribution/create/form-create';
import { EstablishmentDistribution } from '@/app/(in)/establishments/actions/fetch-establishment-distributions';
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
  establishmentDistributions: EstablishmentDistribution[];
  children: ReactNode;
}

export function EstablishmentDistributionCreateSheet({
  establishmentId,
  establishmentDistributions,
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
          establishmentDistributions={establishmentDistributions}
        />
      </SheetContent>
    </Sheet>
  );
}
