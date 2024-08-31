'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

export async function deleteEstablishmentDistribution(id: string) {
  await api(`/establishment-distributions/${id}`, {
    method: 'DELETE',
  });

  revalidateTag('establishments');
  revalidateTag('establishment-distributions');
}
