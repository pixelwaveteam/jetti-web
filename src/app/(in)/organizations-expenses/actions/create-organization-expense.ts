'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

interface CreateOrganizationExpense {
  organizationId: string;
  expenseId: string;
  amount: number;
}

export async function createOrganizationExpense(data: CreateOrganizationExpense) {
  await api('/organizations-expenses', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  revalidateTag('organizations-expenses');
}
