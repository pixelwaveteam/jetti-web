'use server';

import { api } from '@/lib/api';

import { CashFlow } from './fetch-cash-flow';

export async function fetchLastCashFlow(terminalId: string) {
  try {
    const response = await api(`/cash-flows/last/${terminalId}`);

    if (response?.statusCode === 400) {
      return null;
    }

    return response as unknown as CashFlow;
  } catch {
    return null;
  }
}
