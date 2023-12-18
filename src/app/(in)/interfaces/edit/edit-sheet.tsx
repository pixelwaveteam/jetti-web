'use client';

import { Edit } from 'lucide-react';
import { useContext } from 'react';

import { Interface } from '@/app/(in)/interfaces/columns';
import { InterfaceFormEdit } from '@/app/(in)/interfaces/edit/form-edit';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SheetContext } from '@/providers/sheet-provider';

interface InterfaceEditSheetProps {
  interfaceTerminal: Interface;
}

export function InterfaceEditSheet({
  interfaceTerminal,
}: InterfaceEditSheetProps) {
  const { show, setShow } = useContext(SheetContext);

  return (
    <Sheet open={show} onOpenChange={setShow}>
      <SheetTrigger>
        <div
          role='button'
          className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 p-0'
        >
          <Edit className='h-4 w-4' />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Interface</SheetTitle>
        </SheetHeader>
        <InterfaceFormEdit interfaceTerminal={interfaceTerminal} />
      </SheetContent>
    </Sheet>
  );
}
