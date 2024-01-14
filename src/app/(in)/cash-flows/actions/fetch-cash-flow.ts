'use server';

import { CashFlowData } from '@/app/(in)/cash-flows/columns';
import { api } from '@/lib/api';

export async function fetchCashFlow(id: string) {
  const response = await api<CashFlowData>(`/cash-flows/${id}`);

  return response;
}
