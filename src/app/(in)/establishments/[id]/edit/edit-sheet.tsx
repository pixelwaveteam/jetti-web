'use client';

import { Edit } from 'lucide-react';
import { useContext } from 'react';

import { EstablishmentFormEdit } from '@/app/(in)/establishments/[id]/edit/form-edit';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SheetContext } from '@/providers/sheet-provider';
import { Establishment } from '../../actions/fetch-establishments';

interface EstablishmentEditSheetProps {
  establishment: Establishment;
}

export function EstablishmentEditSheet({
  establishment,
}: EstablishmentEditSheetProps) {
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
          <SheetTitle className='truncate'>Alterar Local</SheetTitle>
        </SheetHeader>
        <EstablishmentFormEdit establishment={establishment} />
      </SheetContent>
    </Sheet>
  );
}
