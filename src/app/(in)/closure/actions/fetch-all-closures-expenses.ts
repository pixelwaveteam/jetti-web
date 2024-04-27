'use server';

import { api } from '@/lib/api';
import { ClosureExpense, ServerClosureExpense } from './fetch-closure-expenses';

export async function fetchAllClosuresExpenses() {
  const response = await api<ServerClosureExpense[]>(`/closures/all/expenses`, { 
    next: {
      tags: ['closures-expenses'],
    },
  });

  const formattedResponse: ClosureExpense[] = response.map(entry => ({ id: entry.id, ...entry.props }))

  return formattedResponse;
}
