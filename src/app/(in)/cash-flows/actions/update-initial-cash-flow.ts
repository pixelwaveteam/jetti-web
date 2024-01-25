'use server';

import { api } from '@/lib/api';
import { revalidateTag } from 'next/cache';

interface UpdateInitialCashFlow {
  id: string;
  data: {
    cashIn: number;
    cashOut: number;
  };
}

export async function updateInitialCashFlow({ id, data }: UpdateInitialCashFlow) {
  await api(`/cash-flows/initial/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  revalidateTag('cash-flows');
  revalidateTag('net-distributions');
}
