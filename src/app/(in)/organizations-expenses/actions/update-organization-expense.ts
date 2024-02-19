'use server';

import { api } from '@/lib/api';
import { revalidateTag } from 'next/cache';

interface UpdateOrganizationExpense {
  id: string;
  data: {
    amount: number;
  };
}

export async function updateOrganizationExpense({ id, data }: UpdateOrganizationExpense) {
  await api(`/organizations-expenses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  revalidateTag('organizations-expenses');
}
