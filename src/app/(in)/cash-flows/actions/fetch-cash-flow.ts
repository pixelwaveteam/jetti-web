'use server';

import { api } from '@/lib/api';

export interface CashFlow {
  id: string;
  registeredEstablishmentName: string;
  registeredInterfaceName: string;
  terminalId: string;
  operatorId: string;
  code: number;
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
