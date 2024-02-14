'use server';

import { api } from '@/lib/api';
import { Expense } from './fetch-expenses';

export async function fetchExpense(id: string) {
  const response = await api<Expense>(`/expenses/${id}`);

  return response;
}
