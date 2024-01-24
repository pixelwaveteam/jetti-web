'use client';

import { ReactNode, createContext, useCallback, useState } from 'react';

import { Establishment } from '@/app/(in)/establishments/actions/fetch-establishments';
import { Terminal } from '@/app/(in)/terminals/actions/fetch-terminals';

interface CashFlowContextValues {
  terminals: (Terminal & {
    interfaceName?: string;
  })[];
  establishments: Establishment[];
  period: {
    startDate: Date;
    endDate: Date;
  } | null;
  setPeriod: (lastDate: string | null) => void;
}

export const CashFlowContext = createContext<CashFlowContextValues>(
  {} as CashFlowContextValues
);

interface CashFlowProviderProps {
  children: ReactNode;
  initialData: {
    terminals: (Terminal & {
      interfaceName?: string;
    })[];
    establishments: Establishment[];
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

  const establishments = initialData.establishments

  const handlePeriodChange = useCallback((lastDate: string | null) => {
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
      value={{ period, setPeriod: handlePeriodChange, terminals, establishments }}
    >
      {children}
    </CashFlowContext.Provider>
  );
}
