'use client';

import { Edit } from 'lucide-react';
import { useContext } from 'react';

import { Terminal } from '@/app/(in)/terminals/columns';
import { TerminalFormEdit } from '@/app/(in)/terminals/edit/form-edit';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SheetContext } from '@/providers/sheet-provider';

interface TerminalEditSheetProps {
  terminal: Terminal;
}

export function TerminalEditSheet({ terminal }: TerminalEditSheetProps) {
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
          <SheetTitle>Alterar Terminal</SheetTitle>
        </SheetHeader>
        <TerminalFormEdit terminal={terminal} />
      </SheetContent>
    </Sheet>
  );
}
