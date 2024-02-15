'use server';

import { api } from '@/lib/api';
import { revalidateTag } from 'next/cache';

interface UpdateExpense {
  id: string;
  data: {
    name: string;
    amount: number;
  };
}

export async function updateExpense({ id, data }: UpdateExpense) {
  await api(`/expenses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  revalidateTag('expenses');
}
