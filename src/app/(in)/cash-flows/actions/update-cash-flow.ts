'use server';

import { api } from '@/lib/api';
import { revalidateTag } from 'next/cache';

interface UpdateCashFlow {
  id: string;
  data: {
    terminalId: string;
    cashIn: number;
    cashOut: number;
  };
}

export async function updateCashFlow({ id, data }: UpdateCashFlow) {
  await api(`/cash-flows/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  revalidateTag('cash-flows');
  revalidateTag('net-distributions');
}
