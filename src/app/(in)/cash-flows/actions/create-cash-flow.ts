'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';
import { CashFlow } from './fetch-cash-flow';

interface CreateCashFlow {
  terminalId: string;
  cashIn: number;
  cashOut: number;
  date: string;
}

export async function createCashFlow(data: CreateCashFlow) {
  const response = await api<CashFlow>('/cash-flows', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  revalidateTag('cash-flows');

  return response;
}
