'use client';

import { Plus } from 'lucide-react';
import { useContext } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SheetContext } from '@/providers/sheet-provider';
import { OrganizationExpenseFormCreate } from './form-create';

export function OrganizationExpenseCreateSheet() {
  const { show, setShow } = useContext(SheetContext);

  return (
    <Sheet open={show} onOpenChange={setShow}>
      <SheetTrigger asChild>
        <Button variant='secondary' className='flex gap-1' size={'default'}>
          <Plus size={16} />
          <span className='hidden md:block'>Despesa</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Criar Despesa de Organização</SheetTitle>
        </SheetHeader>
        <OrganizationExpenseFormCreate />
      </SheetContent>
    </Sheet>
  );
}
