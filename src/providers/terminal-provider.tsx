'use client';

import { Establishment } from '@/app/(in)/establishments/actions/fetch-establishments';
import { Interface } from '@/app/(in)/interfaces/actions/fetch-interfaces';
import { Organization } from '@/app/(in)/organizations/actions/fetch-organizations';
import { ReactNode, createContext } from 'react';
interface TerminalContextValues {
  organizations: Organization[];
  establishments: Establishment[];
  interfaces: Interface[];
}

export const TerminalContext = createContext<TerminalContextValues>(
  {} as TerminalContextValues
);

interface TerminalProviderProps {
  children: ReactNode;
  initialData: {
    organizations: Organization[];
    establishments: Establishment[];
    interfaces: Interface[];
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
