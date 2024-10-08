'use client';

import { Edit } from 'lucide-react';
import { useContext } from 'react';

import { EstablishmentContactFormEdit } from '@/app/(in)/establishments/[id]/tabs/info/contacts/edit/form-edit';
import { EstablishmentContact } from '@/app/(in)/establishments/actions/fetch-establishment-contacts';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SheetContext } from '@/providers/sheet-provider';

interface EstablishmentContactEditSheetProps {
  establishmentContact: EstablishmentContact;
}

export function EstablishmentContactEditSheet({
  establishmentContact,
}: EstablishmentContactEditSheetProps) {
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
        <EstablishmentContactFormEdit
          establishmentContact={establishmentContact}
        />
      </SheetContent>
    </Sheet>
  );
}
