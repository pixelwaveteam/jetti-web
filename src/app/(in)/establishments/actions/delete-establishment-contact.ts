'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

export async function deleteEstablishmentContact(id: string) {
  await api(`/establishment-contacts/${id}`, {
    method: 'DELETE',
  });

  revalidateTag('establishment-contacts');
}
