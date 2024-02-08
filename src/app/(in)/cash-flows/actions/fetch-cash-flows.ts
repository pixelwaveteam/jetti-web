'use server';

import { api } from '@/lib/api';

export interface CashFlow {
  id: string;
  terminal: string;
  operator: string;
  code: number;
  cashIn: number;
  cashOut: number;
  gross: number;
  net: number;
  date: string;
}

export async function fetchCashFlows() {
  const response = await api<CashFlow[]>('/cash-flows', {
    next: {
      tags: ['cash-flows'],
    },
  });

  return response;
}
