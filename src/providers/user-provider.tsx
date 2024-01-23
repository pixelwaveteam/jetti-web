'use client';

import { ReactNode, createContext } from 'react';

import { OrganizationData } from '@/app/(in)/organizations/columns';

interface UserContextValues {
  organizations: OrganizationData[];
}

export const UserContext = createContext<UserContextValues>(
  {} as UserContextValues
);

interface UserProviderProps {
  children: ReactNode;
  initialData: {
    organizations: OrganizationData[];
  };
}

export function UserProvider({
  children,
  initialData,
}: UserProviderProps) {
  const organizations = initialData.organizations;

  return (
    <UserContext.Provider value={{ organizations }}>
      {children}
    </UserContext.Provider>
  );
}
