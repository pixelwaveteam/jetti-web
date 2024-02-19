'use client';

import { ReactNode, createContext } from 'react';

import { Expense } from '@/app/(in)/expenses/actions/fetch-expenses';
import { Organization } from '@/app/(in)/organizations/actions/fetch-organizations';

interface OrganizationExpenseContextValues {
  organizations: Organization[];
  expenses: Expense[];
}

export const OrganizationExpenseContext = createContext<OrganizationExpenseContextValues>(
  {} as OrganizationExpenseContextValues
);

interface OrganizationExpenseProviderProps {
  children: ReactNode;
  initialData: {
    organizations: Organization[];
    expenses: Expense[];
  };
}

export function OrganizationExpenseProvider({
  children,
  initialData,
}: OrganizationExpenseProviderProps) {
  const organizations = initialData.organizations;
  const expenses = initialData.expenses;

  return (
    <OrganizationExpenseContext.Provider
      value={{ organizations, expenses }}
    >
      {children}
    </OrganizationExpenseContext.Provider>
  );
}
