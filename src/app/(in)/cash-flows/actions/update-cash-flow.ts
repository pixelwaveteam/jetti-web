'use server';

import { api } from '@/lib/api';
import { revalidateTag } from 'next/cache';

interface UpdateCashFlow {
  id: string;
  data: {
    name: string;
  };
}

export async function updateCashFlow({ id, data }: UpdateCashFlow) {
  await api(`/cash-flows/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  revalidateTag('cash-flows');
}
