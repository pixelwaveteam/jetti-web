'use client';

import { subDays } from 'date-fns';
import { ReactNode, createContext, useCallback, useState } from 'react';

import { CashFlow } from '@/app/(in)/cash-flows/actions/fetch-cash-flows';
import { Establishment } from '@/app/(in)/establishments/actions/fetch-establishments';
import { Terminal } from '@/app/(in)/terminals/actions/fetch-terminals';

interface DashboardContextValues {
  cashFlows: (CashFlow & { organizationId?: string })[];
  terminals: (Terminal & { organizationId?: string })[];
  establishments: Establishment[];
  filter: {
    startDate: Date;
    endDate: Date;
    organization: string;
  };
  changeDateFilter: (startDate: Date, endDate: Date) => void;
  changeOrganizationFilter: (organization: string) => void;
}

export const DashboardContext = createContext<DashboardContextValues>(
  {} as DashboardContextValues
);

interface DashboardProviderProps {
  children: ReactNode;
  initialData: {
    cashFlows: (CashFlow & { organizationId?: string })[];
    terminals: (Terminal & { organizationId?: string })[];
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
    organization: '',
  });

  const cashFlows = initialData.cashFlows;
  const terminals = initialData.terminals;
  const establishments = initialData.establishments;

  const changeDateFilter = useCallback((startDate: Date, endDate: Date) => {
    setFilter(state => ({ ...state, startDate, endDate }));
  }, []);

  const changeOrganizationFilter = useCallback((organization: string) => {
    setFilter(state => ({ ...state, organization }));
  }, []);

  return (
    <DashboardContext.Provider
      value={{ cashFlows, terminals, establishments, filter, changeDateFilter, changeOrganizationFilter }}
    >
      {children}
    </DashboardContext.Provider>
  );
}
