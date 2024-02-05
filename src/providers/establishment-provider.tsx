'use client';

import { ReactNode, createContext } from 'react';

import { Organization } from '@/app/(in)/organizations/actions/fetch-organizations';

interface EstablishmentContextValues {
  organizations: Organization[];
}

export const EstablishmentContext = createContext<EstablishmentContextValues>(
  {} as EstablishmentContextValues
);

interface EstablishmentProviderProps {
  children: ReactNode;
  initialData: {
    organizations: Organization[];
  };
}

export function EstablishmentProvider({
  children,
  initialData,
}: EstablishmentProviderProps) {
  const organizations = initialData.organizations;

  return (
    <EstablishmentContext.Provider value={{ organizations }}>
      {children}
    </EstablishmentContext.Provider>
  );
}
