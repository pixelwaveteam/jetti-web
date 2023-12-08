'use client';

import { Plus } from 'lucide-react';

import { EstablishmentFormCreate } from '@/app/(in)/establishments/create/form-create';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function EstablishmentCreateDrawer() {
  return (
    <Sheet>
      <SheetTrigger>
        <div
          role='button'
          className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'
        >
          <Plus size={16} />
          <span>Local</span>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Novo Local</SheetTitle>
        </SheetHeader>
        <EstablishmentFormCreate />
      </SheetContent>
    </Sheet>
  );
}
