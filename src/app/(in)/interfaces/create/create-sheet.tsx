'use client';

import { Plus } from 'lucide-react';
import { useContext } from 'react';

import { InterfaceFormCreate } from '@/app/(in)/interfaces/create/form-create';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SheetContext } from '@/providers/sheet-provider';

export function InterfaceCreateSheet() {
  const { show, setShow } = useContext(SheetContext);

  return (
    <Sheet open={show} onOpenChange={setShow}>
      <SheetTrigger asChild>
        <Button variant='secondary' className='flex gap-1' size={'default'}>
          <Plus size={16} />
          <span className='hidden md:block'>Interface</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Criar Interface</SheetTitle>
        </SheetHeader>
        <InterfaceFormCreate />
      </SheetContent>
    </Sheet>
  );
}
