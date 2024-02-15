'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

interface CreateExpense {
  name: string;
  amount: number;
}

export async function createExpense(data: CreateExpense) {
  await api('/expenses', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  revalidateTag('expenses');
}
