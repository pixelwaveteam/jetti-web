import { Minus, Plus } from 'lucide-react';
import { useContext, useMemo } from 'react';

import { CashFlow } from '@/app/(in)/cash-flows/actions/fetch-cash-flows';
import { Button } from '@/components/ui/button';
import { NewClosureContext } from '@/providers/new-closure-provider';

interface AddCashFlowButtonProps {
  cashFlow: CashFlow;
}

export function AddCashFlowButton({ cashFlow }: AddCashFlowButtonProps) {
  const { addNewCashFlow, closureCashFlows, removeCashFlow } =
    useContext(NewClosureContext);

  const addedToClosure = useMemo(
    () =>
      !!closureCashFlows.find(
        (closureCashFlow) => closureCashFlow.id === cashFlow.id
      ),
    [closureCashFlows, cashFlow.id]
  );

  function handleToggleCashFlowButtonClick() {
    if (addedToClosure) {
      removeCashFlow(cashFlow.id);
      return;
    }

    addNewCashFlow({
      ...cashFlow,
      cashFlowCode: 'code',
    });
  }

  return (
    <Button
      variant={'ghost'}
      size={'icon'}
      onClick={handleToggleCashFlowButtonClick}
    >
      {addedToClosure ? (
        <Minus className='h-4 w-4 text-destructive' />
      ) : (
        <Plus className='h-4 w-4' />
      )}
    </Button>
  );
}
