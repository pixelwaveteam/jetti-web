'use client';

import { useContext, useMemo } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { NewClosureContext } from '@/providers/new-closure-provider';
import { SheetContext } from '@/providers/sheet-provider';
import { ClosureFormCreate } from './form-create';

export function ClosureCreateSheet() {
  const { closureCashFlows } = useContext(NewClosureContext);

  const { show, setShow } = useContext(SheetContext);
  
  const closureCashFlowsTotal = useMemo(() => closureCashFlows.length, [closureCashFlows]);

  console.log({closureCashFlowsTotal})

  if(closureCashFlowsTotal === 0) return;

  return (
    <Sheet open={show} onOpenChange={setShow}>
      <SheetTrigger asChild>
        <Button variant='outline' className='flex gap-2' size='default'>
          <span className='hidden md:block'>Fechamento</span>
          <Badge>{closureCashFlowsTotal}</Badge>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Criar Fechamento</SheetTitle>
        </SheetHeader>

        <ClosureFormCreate />
      </SheetContent>
    </Sheet>
  );
}
