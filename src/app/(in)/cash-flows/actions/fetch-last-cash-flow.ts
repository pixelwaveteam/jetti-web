'use server';

import { CashFlowData } from '@/app/(in)/cash-flows/columns';
import { api } from '@/lib/api';

export async function fetchLastCashFlow(terminalId: string) {
  const response = await api(`/cash-flows/last/${terminalId}`);

  if (response?.statusCode === 400) {
    throw new Error(response.message);
  }

  return response as CashFlowData;
}
