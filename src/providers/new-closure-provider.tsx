'use client';

import { CashFlows } from '@/app/(in)/cash-flows/actions/fetch-cash-flows';
import {
  ReactNode,
  createContext,
  useCallback,
  useState
} from 'react';


interface NewClosureContextValues {
  closureCashFlows: CashFlows[];
  addNewCashFlow: (cashFlow: CashFlows) => void;
  removeCashFlow: (id: string) => void;
}

export const NewClosureContext = createContext<NewClosureContextValues>(
  {} as NewClosureContextValues
);

interface NewClosureProviderProps {
  children: ReactNode;
}

export function NewClosureProvider({
  children,
}: NewClosureProviderProps) {
  const [closureCashFlows, setClosureCashFlows] = useState<CashFlows[]>([]);

  const addNewCashFlow = useCallback((cashFlow: CashFlows) => {
    setClosureCashFlows(state => [cashFlow, ...state])
  }, [])

  const removeCashFlow = useCallback((id: string) => {
    setClosureCashFlows(state => state.filter(entry => entry.id !== id))
  }, [])

  return (
    <NewClosureContext.Provider
      value={{ addNewCashFlow, closureCashFlows, removeCashFlow }}
    >
      {children}
    </NewClosureContext.Provider>
  );
}
