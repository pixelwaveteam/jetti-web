'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

export async function deleteInterface(id: string) {
  await api(`/interfaces/${id}`, {
    method: 'DELETE',
  });

  revalidateTag('interfaces');
}
