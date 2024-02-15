'use client';

import { CashFlowDataTableData } from '@/app/(in)/cash-flows/columns';
import { Expense } from '@/app/(in)/expenses/actions/fetch-expenses';
import { ReactNode, createContext, useCallback, useState } from 'react';

interface NewClosureContextValues {
  closureCashFlows: CashFlowDataTableData[];
  addNewCashFlow: (cashFlow: CashFlowDataTableData) => void;
  removeCashFlow: (id: string) => void;
  resetClosureCashFlows: () => void;
  expenses: Expense[];
}

export const NewClosureContext = createContext<NewClosureContextValues>(
  {} as NewClosureContextValues
);

interface NewClosureProviderProps {
  children: ReactNode;
  initialData: {
    expenses: Expense[]
  }
}

export function NewClosureProvider({ children, initialData }: NewClosureProviderProps) {
  const [closureCashFlows, setClosureCashFlows] = useState<
    CashFlowDataTableData[]
  >([]);

  const addNewCashFlow = useCallback((cashFlow: CashFlowDataTableData) => {
    setClosureCashFlows((state) => [cashFlow, ...state]);
  }, []);

  const removeCashFlow = useCallback((id: string) => {
    setClosureCashFlows((state) => state.filter((entry) => entry.id !== id));
  }, []);

  const resetClosureCashFlows = useCallback(() => {
    setClosureCashFlows([])
  }, [])

  return (
    <NewClosureContext.Provider
      value={{ 
        addNewCashFlow, 
        closureCashFlows, 
        removeCashFlow, 
        resetClosureCashFlows, 
        expenses: initialData.expenses
      }}
    >
      {children}
    </NewClosureContext.Provider>
  );
}
