'use client';

import { Edit } from 'lucide-react';
import { useContext } from 'react';

import { EstablishmentAddressFormEdit } from '@/app/(in)/establishments/[id]/tabs/info/address/edit/form-edit';
import { EstablishmentAddress } from '@/app/(in)/establishments/actions/fetch-establishment-address';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SheetContext } from '@/providers/sheet-provider';

interface EstablishmentAddressEditSheetProps {
  establishmentAddress: EstablishmentAddress;
}

export function EstablishmentAddressEditSheet({
  establishmentAddress,
}: EstablishmentAddressEditSheetProps) {
  const { show, setShow } = useContext(SheetContext);

  return (
    <Sheet open={show} onOpenChange={setShow}>
      <SheetTrigger asChild>
        <Button variant='secondary' className='flex gap-1' size={'default'}>
          <Edit size={16} />
          <span className='hidden md:block'>Alterar</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Alterar Endereço</SheetTitle>
        </SheetHeader>
        <EstablishmentAddressFormEdit
          establishmentAddress={establishmentAddress}
        />
      </SheetContent>
    </Sheet>
  );
}
