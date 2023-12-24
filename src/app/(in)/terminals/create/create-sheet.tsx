'use client';

import { Plus } from 'lucide-react';

import { TerminalFormCreate } from '@/app/(in)/terminals/create/form-create';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function TerminalCreateSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='secondary' className='flex gap-1' size={'default'}>
          <Plus size={16} />
          <span className='hidden md:block'>Terminal</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>CriarTerminal</SheetTitle>
        </SheetHeader>
        <TerminalFormCreate />
      </SheetContent>
    </Sheet>
  );
}
