'use client';

import { ReactNode, createContext, useCallback, useState } from 'react';

import { TerminalData } from '@/app/(in)/terminals/columns';

interface CashFlowContextValues {
  terminals: TerminalData[];
  period: {
    startDate: Date;
    endDate: Date;
  } | null;
  setPeriod: (lastDate: Date | null) => void;
}

export const CashFlowContext = createContext<CashFlowContextValues>(
  {} as CashFlowContextValues
);

interface CashFlowProviderProps {
  children: ReactNode;
  initialData: {
    terminals: TerminalData[];
  };
}

export function CashFlowProvider({
  children,
  initialData,
}: CashFlowProviderProps) {
  const [period, setPeriod] = useState<{
    startDate: Date;
    endDate: Date;
  } | null>(null);

  const terminals = initialData.terminals;

  const handlePeriodChange = useCallback((lastDate: Date | null) => {
    if (!lastDate) {
      setPeriod(null);
      return;
    }

    setPeriod({
      startDate: new Date(lastDate),
      endDate: new Date(),
    });
  }, []);

  return (
    <CashFlowContext.Provider
      value={{ period, setPeriod: handlePeriodChange, terminals }}
    >
      {children}
    </CashFlowContext.Provider>
  );
}
