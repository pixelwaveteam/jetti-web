'use client';

import { Plus } from 'lucide-react';

import { CashFlowFormCreate } from '@/app/(in)/cash-flows/create/form-create';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function CashFlowCreateDrawer() {
  return (
    <Sheet>
      <SheetTrigger>
        <div
          role='button'
          className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2'
        >
          <Plus size={16} />
          <span>Leitura</span>
        </div>
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
