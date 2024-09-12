'use server';

import { api } from '@/lib/api';

export interface CashFlow {
  id: string;
  terminal: string;
  registeredEstablishmentName: string;
  registeredInterfaceName: string;
  operator: string;
  code: number;
  cashIn: number;
  cashOut: number;
  input: number;
  output: number;
  lastInput: number;
  lastOutput: number,
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
