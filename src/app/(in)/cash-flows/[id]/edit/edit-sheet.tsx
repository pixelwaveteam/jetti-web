'use client';

import { Edit } from 'lucide-react';
import { useContext } from 'react';

import { CashFlowFormEdit } from '@/app/(in)/cash-flows/[id]/edit/form-edit';
import { CashFlow } from '@/app/(in)/cash-flows/columns';
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
        <Button variant='secondary' className='flex gap-1' size={'default'}>
          <Edit size={16} />
          <span className='hidden md:block'>Alterar</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Editar Leitura</SheetTitle>
        </SheetHeader>
        <CashFlowFormEdit cashFlow={cashFlow} />
      </SheetContent>
    </Sheet>
  );
}
