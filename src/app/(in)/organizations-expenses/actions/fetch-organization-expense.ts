'use server';

import { api } from '@/lib/api';
import { OrganizationExpense } from './fetch-organizations-expenses';

export async function fetchOrganizationExpense(organizationId: string, expenseId: string) {
  const response = await api<OrganizationExpense>(`/organizations-expenses/${organizationId}/${expenseId}`);

  return response;
}
