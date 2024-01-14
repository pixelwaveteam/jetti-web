'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

export async function deleteEstablishment(id: string) {
  await api(`/establishments/${id}`, {
    method: 'DELETE',
  });

  revalidateTag('establishments');
}
