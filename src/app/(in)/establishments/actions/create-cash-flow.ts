'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

interface CreateCashFlow {
  name: string;
}

export async function createCashFlow(data: CreateCashFlow) {
  await api('/cash-flows', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  revalidateTag('cash-flows');
}
