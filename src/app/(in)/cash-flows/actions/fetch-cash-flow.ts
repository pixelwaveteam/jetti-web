'use server';

import { api } from '@/lib/api';

export interface CashFlow {
  id: string;
  terminalId: string;
  operatorId: string;
  input: number;
  output: number;
  cashIn: number;
  cashOut: number;
  gross: number;
  net: number;
  date: string;
}

export async function fetchCashFlow(id: string) {
  const response = await api<CashFlow>(`/cash-flows/${id}`);

  return response;
}
