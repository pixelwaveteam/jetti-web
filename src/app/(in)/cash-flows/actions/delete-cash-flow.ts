'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

export async function deleteCashFlow(id: string) {
  await api(`/cash-flows/${id}`, {
    method: 'DELETE',
  });

  revalidateTag('cash-flows');
}
