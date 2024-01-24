'use client';

import { ReactNode, createContext } from 'react';

import { OrganizationData } from '@/app/(in)/organizations/columns';
import { Terminal } from '@/app/(in)/terminals/actions/fetch-terminals';

interface UserContextValues {
  organizations: OrganizationData[];
  terminals: Terminal[];
}

export const UserContext = createContext<UserContextValues>(
  {} as UserContextValues
);

interface UserProviderProps {
  children: ReactNode;
  initialData: {
    organizations: OrganizationData[];
    terminals: Terminal[];
  };
}

export function UserProvider({
  children,
  initialData,
}: UserProviderProps) {
  const organizations = initialData.organizations;

  const terminals = initialData.terminals;

  return (
    <UserContext.Provider value={{ organizations, terminals }}>
      {children}
    </UserContext.Provider>
  );
}
