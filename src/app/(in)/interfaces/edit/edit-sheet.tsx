'use client';

import { Edit } from 'lucide-react';
import { useContext } from 'react';

import { InterfaceFormEdit } from '@/app/(in)/interfaces/edit/form-edit';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SheetContext } from '@/providers/sheet-provider';
import { Interface } from '../actions/fetch-interfaces';

interface InterfaceEditSheetProps {
  interfaceTerminal: Interface;
}

export function InterfaceEditSheet({
  interfaceTerminal,
}: InterfaceEditSheetProps) {
  const { show, setShow } = useContext(SheetContext);

  return (
    <Sheet open={show} onOpenChange={setShow}>
      <SheetTrigger asChild>
        <Button variant='ghost' className='flex gap-1' size={'icon'}>
          <Edit size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Alterar Interface</SheetTitle>
        </SheetHeader>
        <InterfaceFormEdit interfaceTerminal={interfaceTerminal} />
      </SheetContent>
    </Sheet>
  );
}
