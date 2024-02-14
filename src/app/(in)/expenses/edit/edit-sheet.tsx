'use client';

import { Edit } from 'lucide-react';
import { useContext } from 'react';

import { ExpenseFormEdit } from '@/app/(in)/expenses/edit/form-edit';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SheetContext } from '@/providers/sheet-provider';
import { Expense } from '../actions/fetch-expenses';

interface ExpenseEditSheetProps {
  expense: Expense;
}

export function ExpenseEditSheet({
  expense,
}: ExpenseEditSheetProps) {
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
          <SheetTitle>Alterar Despesa</SheetTitle>
        </SheetHeader>
        <ExpenseFormEdit expense={expense} />
      </SheetContent>
    </Sheet>
  );
}
