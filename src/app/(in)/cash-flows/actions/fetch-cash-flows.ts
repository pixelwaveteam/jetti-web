'use server';

import { CashFlowDataTable } from '@/app/(in)/cash-flows/columns';
import { api } from '@/lib/api';

export async function fetchCashFlows() {
  const response = await api<CashFlowDataTable[]>('/cash-flows', {
    next: {
      tags: ['cash-flows'],
    },
  });

  return response;
}
