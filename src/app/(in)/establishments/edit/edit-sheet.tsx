'use client';

import { Edit } from 'lucide-react';
import { useContext } from 'react';

import { Establishment } from '@/app/(in)/establishments/columns';
import { EstablishmentFormEdit } from '@/app/(in)/establishments/edit/form-edit';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SheetContext } from '@/providers/sheet-provider';

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
          Alterar
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Alterar Local</SheetTitle>
        </SheetHeader>
        <EstablishmentFormEdit establishment={establishment} />
      </SheetContent>
    </Sheet>
  );
}
