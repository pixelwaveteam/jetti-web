'use client';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SheetContext } from '@/providers/sheet-provider';
import { Edit } from 'lucide-react';
import { useContext } from 'react';
import { OrganizationExpense } from '../actions/fetch-organizations-expenses';
import { OrganizationExpenseFormEdit } from './form-edit';

interface OrganizationExpenseEditSheetProps {
  organizationExpense: OrganizationExpense;
}

export function OrganizationExpenseEditSheet({
  organizationExpense,
}: OrganizationExpenseEditSheetProps) {
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
        <OrganizationExpenseFormEdit organizationExpense={organizationExpense} />
      </SheetContent>
    </Sheet>
  );
}
