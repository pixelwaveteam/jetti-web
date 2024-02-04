'use client';

import { CashFlowDataTableData } from '@/app/(in)/cash-flows/columns';
import { ReactNode, createContext, useCallback, useState } from 'react';

interface NewClosureContextValues {
  closureCashFlows: CashFlowDataTableData[];
  addNewCashFlow: (cashFlow: CashFlowDataTableData) => void;
  removeCashFlow: (id: string) => void;
}

export const NewClosureContext = createContext<NewClosureContextValues>(
  {} as NewClosureContextValues
);

interface NewClosureProviderProps {
  children: ReactNode;
}

export function NewClosureProvider({ children }: NewClosureProviderProps) {
  const [closureCashFlows, setClosureCashFlows] = useState<
    CashFlowDataTableData[]
  >([]);

  const addNewCashFlow = useCallback((cashFlow: CashFlowDataTableData) => {
    setClosureCashFlows((state) => [cashFlow, ...state]);
  }, []);

  const removeCashFlow = useCallback((id: string) => {
    setClosureCashFlows((state) => state.filter((entry) => entry.id !== id));
  }, []);

  return (
    <NewClosureContext.Provider
      value={{ addNewCashFlow, closureCashFlows, removeCashFlow }}
    >
      {children}
    </NewClosureContext.Provider>
  );
}
