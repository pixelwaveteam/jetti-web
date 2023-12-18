'use client';

import { Plus } from 'lucide-react';

import { TerminalFormCreate } from '@/app/(in)/terminals/create/form-create';
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
      <SheetTrigger>
        <div
          role='button'
          className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'
        >
          <Plus size={16} />
          <span className='hidden md:block'>Terminal</span>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Novo Terminal</SheetTitle>
        </SheetHeader>
        <TerminalFormCreate />
      </SheetContent>
    </Sheet>
  );
}
