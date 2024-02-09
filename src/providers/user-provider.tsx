'use client';

import { ReactNode, createContext } from 'react';

import { Establishment } from '@/app/(in)/establishments/actions/fetch-establishments';
import { Organization } from '@/app/(in)/organizations/actions/fetch-organizations';

interface UserContextValues {
  organizations: Organization[];
  establishments: Establishment[];
}

export const UserContext = createContext<UserContextValues>(
  {} as UserContextValues
);

interface UserProviderProps {
  children: ReactNode;
  initialData: {
    organizations: Organization[];
    establishments: Establishment[];
  };
}

export function UserProvider({ children, initialData }: UserProviderProps) {
  const organizations = initialData.organizations;

  const establishments = initialData.establishments;

  return (
    <UserContext.Provider value={{ organizations, establishments }}>
      {children}
    </UserContext.Provider>
  );
}
