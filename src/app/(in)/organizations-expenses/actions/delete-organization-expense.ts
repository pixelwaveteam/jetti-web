'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

export async function deleteOrganizationExpense(id: string) {
  await api(`/organizations-expenses/${id}`, {
    method: 'DELETE',
  });

  revalidateTag('organizations-expenses');
}
