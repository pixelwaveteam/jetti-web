'use client';

import { Edit } from 'lucide-react';
import { useContext } from 'react';

import { CashFlow } from '@/app/(in)/cash-flows/columns';
import { CashFlowFormEdit } from '@/app/(in)/cash-flows/edit/form-edit';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SheetContext } from '@/providers/sheet-provider';

interface CashFlowEditSheetProps {
  cashFlow: CashFlow;
}

export function CashFlowEditSheet({ cashFlow }: CashFlowEditSheetProps) {
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
          <SheetTitle>Edit CashFlow</SheetTitle>
        </SheetHeader>
        <CashFlowFormEdit cashFlow={cashFlow} />
      </SheetContent>
    </Sheet>
  );
}
