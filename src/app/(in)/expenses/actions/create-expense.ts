'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';
import { Expense } from './fetch-expenses';

interface CreateExpense {
  name: string;
}

export async function createExpense(data: CreateExpense) {
  const expense: Expense = await api('/expenses', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  revalidateTag('expenses');

  return { expense };
}
