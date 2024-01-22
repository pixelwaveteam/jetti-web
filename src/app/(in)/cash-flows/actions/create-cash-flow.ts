'use server';

import { revalidateTag } from 'next/cache';

import { CashFlowData } from '@/app/(in)/cash-flows/columns';
import { api } from '@/lib/api';

interface CreateCashFlow {
  terminalId: string;
  cashIn: number;
  cashOut: number;
  date: string;
}

export async function createCashFlow(data: CreateCashFlow) {
  const response = await api<CashFlowData>('/cash-flows', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  revalidateTag('cash-flows');

  return response;
}
