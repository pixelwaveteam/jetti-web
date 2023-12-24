'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

interface CreateEstablishmentContact {
  establishmentId: string;
  name: string;
  phone: string;
  email: string;
}

export async function createEstablishmentContact(
  data: CreateEstablishmentContact
) {
  await api('/establishment-contacts', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  revalidateTag('establishment-contacts');
}
