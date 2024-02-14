'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

export async function deleteExpense(id: string) {
  await api(`/expenses/${id}`, {
    method: 'DELETE',
  });

  revalidateTag('expenses');
}
