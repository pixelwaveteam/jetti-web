'use client';

import { ReactNode, createContext } from 'react';

import { EstablishmentData } from '@/app/(in)/establishments/columns';
import { InterfaceData } from '@/app/(in)/interfaces/columns';
import { OrganizationData } from '@/app/(in)/organizations/columns';

interface TerminalContextValues {
  organizations: OrganizationData[];
  establishments: EstablishmentData[];
  interfaces: InterfaceData[];
}

export const TerminalContext = createContext<TerminalContextValues>(
  {} as TerminalContextValues
);

interface TerminalProviderProps {
  children: ReactNode;
  initialData: {
    organizations: OrganizationData[];
    establishments: EstablishmentData[];
    interfaces: InterfaceData[];
  };
}

export function TerminalProvider({
  children,
  initialData,
}: TerminalProviderProps) {
  const organizations = initialData.organizations;
  const establishments = initialData.establishments;
  const interfaces = initialData.interfaces;

  return (
    <TerminalContext.Provider
      value={{ organizations, establishments, interfaces }}
    >
      {children}
    </TerminalContext.Provider>
  );
}
