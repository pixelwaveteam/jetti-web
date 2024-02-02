import { CashFlows } from "@/app/(in)/cash-flows/actions/fetch-cash-flows";
import { NewClosureContext } from "@/providers/new-closure-provider";
import { Minus, Plus } from "lucide-react";
import { useContext, useMemo } from "react";
import { Button } from "./ui/button";

interface AddCashFlowButtonProps {
  cashFlow: CashFlows;
}

export function AddCashFlowButton({ cashFlow }:AddCashFlowButtonProps ) {
  const { addNewCashFlow, closureCashFlows, removeCashFlow } = useContext(NewClosureContext)

  const addedToClosure = useMemo(() => 
    !!closureCashFlows.find(closureCashFlow => closureCashFlow.id === cashFlow.id)
  , [closureCashFlows, cashFlow.id])

  function handleToggleCashFlowButtonClick() {
    if(addedToClosure) {
      removeCashFlow(cashFlow.id)
      return;
    }
    
    addNewCashFlow(cashFlow)
  }

  return (
    <Button variant={'ghost'} size={'icon'} onClick={handleToggleCashFlowButtonClick}>
      {
        addedToClosure ? (
          <Minus className='h-4 w-4 text-destructive' />
        ) : (
          <Plus className='h-4 w-4' />
        )
      }
    </Button>
  )
}