'use server';

import { api } from '@/lib/api';

export interface OrganizationExpense {
  id: string;
  expenseId: string;
  organizationId: string;
  amount: number;
  createdAt: string;
}

export async function fetchOrganizationsExpenses() {
  const response = await api<OrganizationExpense[]>('/organizations-expenses', {
    next: {
      tags: ['organizations-expenses'],
    },
  });

  return response;
}
