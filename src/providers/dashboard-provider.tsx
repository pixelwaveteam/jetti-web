'use client';

import { subDays } from 'date-fns';
import { ReactNode, createContext, useCallback, useState } from 'react';

import { CashFlows } from '@/app/(in)/cash-flows/actions/fetch-cash-flows';
import { Establishment } from '@/app/(in)/establishments/actions/fetch-establishments';
import { Terminal } from '@/app/(in)/terminals/actions/fetch-terminals';

interface DashboardContextValues {
  cashFlows: CashFlows[];
  terminals: Terminal[];
  establishments: Establishment[];
  filter: {
    startDate: Date;
    endDate: Date;
  };
  changeFilter: (startDate: Date, endDate: Date) => void;
}

export const DashboardContext = createContext<DashboardContextValues>(
  {} as DashboardContextValues
);

interface DashboardProviderProps {
  children: ReactNode;
  initialData: {
    cashFlows: CashFlows[];
    terminals: Terminal[];
    establishments: Establishment[];
  };
}

export function DashboardProvider({
  children,
  initialData,
}: DashboardProviderProps) {
  const [filter, setFilter] = useState({
    startDate: subDays(new Date(), 30),
    endDate: new Date(),
  });

  const cashFlows = initialData.cashFlows;
  const terminals = initialData.terminals;
  const establishments = initialData.establishments;

  const changeFilter = useCallback((startDate: Date, endDate: Date) => {
    setFilter({ startDate, endDate });
  }, []);

  return (
    <DashboardContext.Provider
      value={{ cashFlows, terminals, establishments, filter, changeFilter }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
