'use server';

import { api } from '@/lib/api';
import { OrganizationExpense } from './fetch-organizations-expenses';

export async function fetchOrganizationExpense(expenseId: string) {
  const response = await api<OrganizationExpense>(`/organizations-expenses/${expenseId}`);

  return response;
}
