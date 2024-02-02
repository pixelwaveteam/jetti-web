'use client';

import { Plus } from 'lucide-react';
import { useContext, useMemo } from 'react';

import { CashFlowFormCreate } from '@/app/(in)/cash-flows/create/form-create';
import { SelectEstablishment } from '@/app/(in)/cash-flows/create/select-establishment';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CashFlowContext } from '@/providers/cash-flow-provider';
import { SheetContext } from '@/providers/sheet-provider';

export function CashFlowCreateSheet() {
  const { selectedEstablishment } = useContext(CashFlowContext);
  const { show, setShow } = useContext(SheetContext);

  const renderContent = useMemo(() => {
    if (selectedEstablishment) {
      return <CashFlowFormCreate />;
    }

    return <SelectEstablishment />;
  }, [selectedEstablishment]);

  return (
    <Sheet open={show} onOpenChange={setShow}>
      <SheetTrigger asChild>
        <Button variant='secondary' className='flex gap-1' size={'default'}>
          <Plus size={16} />
          <span className='hidden md:block'>Leitura</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Criar Leitura</SheetTitle>
        </SheetHeader>

        {renderContent}
      </SheetContent>
    </Sheet>
  );
}
