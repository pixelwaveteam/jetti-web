'use client';

import { Plus } from 'lucide-react';

import { CashFlowFormCreate } from '@/app/(in)/cash-flows/create/form-create';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function CashFlowCreateSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='secondary' className='flex gap-1' size={'default'}>
          <Plus size={16} />
          <span className='hidden md:block'>Leitura</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Nova Leitura</SheetTitle>
        </SheetHeader>
        <CashFlowFormCreate />
      </SheetContent>
    </Sheet>
  );
}
