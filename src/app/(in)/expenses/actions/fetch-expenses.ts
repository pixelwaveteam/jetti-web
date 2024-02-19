'use server';

import { api } from '@/lib/api';

export interface Expense {
  id: string;
  name: string;
  createdAt: string;
}

export async function fetchExpenses() {
  const response = await api<Expense[]>('/expenses', {
    next: {
      tags: ['expenses'],
    },
  });

  return response;
}
