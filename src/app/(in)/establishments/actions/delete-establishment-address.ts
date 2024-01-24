'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

export async function deleteEstablishmentAddress(id: string) {
  await api(`/establishment-adresses/${id}`, {
    method: 'DELETE',
  });

  revalidateTag('establishment-address');
}
