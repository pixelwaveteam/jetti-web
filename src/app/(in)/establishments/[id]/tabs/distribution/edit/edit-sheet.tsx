'use client';

import { Edit } from 'lucide-react';
import { useContext } from 'react';

import { EstablishmentDistributionFormEdit } from '@/app/(in)/establishments/[id]/tabs/distribution/edit/form-edit';
import { EstablishmentDistributionData } from '@/app/(in)/establishments/actions/fetch-establishment-distributions';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SheetContext } from '@/providers/sheet-provider';

interface EstablishmentDistributionEditSheetProps {
  establishmentDistribution: EstablishmentDistributionData;
}

export function EstablishmentDistributionEditSheet({
  establishmentDistribution,
}: EstablishmentDistributionEditSheetProps) {
  const { show, setShow } = useContext(SheetContext);

  return (
    <Sheet open={show} onOpenChange={setShow}>
      <SheetTrigger asChild>
        <Button variant='ghost' size={'icon'}>
          <Edit size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Alterar Contato</SheetTitle>
        </SheetHeader>
        <EstablishmentDistributionFormEdit
          establishmentDistribution={establishmentDistribution}
        />
      </SheetContent>
    </Sheet>
  );
}
