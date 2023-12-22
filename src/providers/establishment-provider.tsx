'use client';

import { ReactNode, createContext } from 'react';

import { OrganizationData } from '@/app/(in)/organizations/columns';

interface EstablishmentContextValues {
  organizations: OrganizationData[];
}

export const EstablishmentContext = createContext<EstablishmentContextValues>(
  {} as EstablishmentContextValues
);

interface EstablishmentProviderProps {
  children: ReactNode;
  initialData: {
    organizations: OrganizationData[];
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
