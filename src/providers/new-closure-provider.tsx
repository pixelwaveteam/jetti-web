'use client';

import { CashFlowDataTableData } from '@/app/(in)/cash-flows/columns';
import { Expense } from '@/app/(in)/expenses/actions/fetch-expenses';
import { OrganizationExpense } from '@/app/(in)/organizations-expenses/actions/fetch-organizations-expenses';
import { ReactNode, createContext, useCallback, useMemo, useState } from 'react';

interface NewClosureContextValues {
  closureCashFlows: CashFlowDataTableData[];
  addNewCashFlow: (cashFlow: CashFlowDataTableData) => void;
  addNewCashFlows: (cashFlows: CashFlowDataTableData[]) => void;
  removeCashFlow: (id: string) => void;
  removeCashFlows: (ids: string[]) => void;
  resetClosureCashFlows: () => void;
  expenses: (Expense & OrganizationExpense)[];
}

export const NewClosureContext = createContext<NewClosureContextValues>(
  {} as NewClosureContextValues
);

interface NewClosureProviderProps {
  children: ReactNode;
  initialData: {
    expenses: (Expense & OrganizationExpense)[]
  }
}

export function NewClosureProvider({ children, initialData }: NewClosureProviderProps) {
  const [closureCashFlows, setClosureCashFlows] = useState<
    CashFlowDataTableData[]
  >([]);

  const cashFlowsOrganizationId = useMemo(() => closureCashFlows.length > 0 ? closureCashFlows[0].organizationId : '', [closureCashFlows])

  const expenses = useMemo(() => initialData.expenses.filter(expense =>
      expense.organizationId === cashFlowsOrganizationId
    ),[cashFlowsOrganizationId, initialData.expenses])

  const addNewCashFlow = useCallback((cashFlow: CashFlowDataTableData) => {
    setClosureCashFlows((state) => [cashFlow, ...state]);
  }, []);

  const addNewCashFlows = useCallback((cashFlows: CashFlowDataTableData[]) => {
    setClosureCashFlows((state) => [...cashFlows, ...state]);
  }, []);

  const removeCashFlow = useCallback((id: string) => {
    setClosureCashFlows((state) => state.filter((entry) => entry.id !== id));
  }, []);

  const removeCashFlows = useCallback((ids: string[]) => {
    setClosureCashFlows((state) => state.filter((entry) => !ids.includes(entry.id)));
  }, []);

  const resetClosureCashFlows = useCallback(() => {
    setClosureCashFlows([])
  }, [])

  return (
    <NewClosureContext.Provider
      value={{ 
        addNewCashFlow, 
        addNewCashFlows,
        closureCashFlows, 
        removeCashFlow, 
        removeCashFlows,
        resetClosureCashFlows, 
        expenses
      }}
    >
      {children}
    </NewClosureContext.Provider>
  );
}
