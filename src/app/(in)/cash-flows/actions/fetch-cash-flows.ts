'use server';

import { CashFlowData } from '@/app/(in)/cash-flows/columns';
import { api } from '@/lib/api';

export async function fetchCashFlows() {
  const response = await api<CashFlowData[]>('/cash-flows', {
    next: {
      tags: ['cash-flows'],
    },
  });

  return response;
}
