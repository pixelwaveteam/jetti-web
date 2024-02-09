'use client';

import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';

import { Establishment } from '@/app/(in)/establishments/actions/fetch-establishments';
import { Terminal } from '@/app/(in)/terminals/actions/fetch-terminals';

interface CashFlowContextValues {
  terminals: (Terminal & {
    interfaceName?: string;
  })[];
  establishments: Establishment[];
  initialData: {
    terminals: (Terminal & {
      interfaceName?: string;
    })[];
    establishments: Establishment[];
  };
  period: {
    startDate: Date;
    endDate: Date;
  } | null;
  setPeriod: (lastDate: string | null) => void;
  selectedEstablishment: Establishment | null;
  selectEstablishment: (establishment: Establishment | null) => void;
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

  const [selectedEstablishment, setSelectedEstablishment] =
    useState<Establishment | null>(null);

  const terminals = useMemo(() => {
    return initialData.terminals.filter(
      (terminal) => terminal.establishmentId === selectedEstablishment?.id
    );
  }, [selectedEstablishment?.id, initialData.terminals]);

  const establishments = useMemo(() => {
    const terminalEstablishments = initialData.terminals
      .map((terminal) => terminal.establishmentId)
      .filter((value, index, self) => self.indexOf(value) === index);

    return initialData.establishments
      .filter((establishment) =>
        terminalEstablishments.includes(establishment.id)
      )
      .filter((establishment) => establishment.isActive)
      .filter((establishment) => !establishment.isWarehouse);
  }, [initialData.terminals, initialData.establishments]);

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

  const handleSelectEstablishment = useCallback(
    (establishment: Establishment | null) => {
      setSelectedEstablishment(establishment);
    },
    []
  );

  return (
    <CashFlowContext.Provider
      value={{
        period,
        terminals,
        establishments,
        selectedEstablishment,
        initialData,
        setPeriod: handlePeriodChange,
        selectEstablishment: handleSelectEstablishment,
      }}
    >
      {children}
    </CashFlowContext.Provider>
  );
}
