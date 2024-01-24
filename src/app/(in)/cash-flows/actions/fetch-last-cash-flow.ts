'use server';

import { api } from '@/lib/api';
import { CashFlow } from './fetch-cash-flow';

export async function fetchLastCashFlow(terminalId: string) {
  const response = await api(`/cash-flows/last/${terminalId}`);

  if (response?.statusCode === 400) {
    throw new Error(response.message);
  }

  return response as CashFlow;
}
