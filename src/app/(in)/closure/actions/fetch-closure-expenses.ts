'use server';

import { api } from '@/lib/api';

interface ServerClosureExpense {
  id: string;
  props: {
    closureId: string;
    expenseId: string;
  }
}

export interface ClosureExpense {
  id: string;
  closureId: string;
  expenseId: string;
}

export async function fetchClosureExpenses(id: string) {
  const response = await api<ServerClosureExpense[]>(`/closures/expenses/${id}`);

  const formattedResponse: ClosureExpense[] = response.map(entry => ({ id: entry.id, ...entry.props }))

  return formattedResponse;
}
