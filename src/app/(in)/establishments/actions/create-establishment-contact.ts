'use server';

import { revalidateTag } from 'next/cache';

import { EstablishmentData } from '@/app/(in)/establishments/columns';
import { api } from '@/lib/api';

interface CreateEstablishmentContact {
  establishmentId: string;
  name: string;
}

export async function createEstablishmentContact(
  data: CreateEstablishmentContact
) {
  const response = await api<EstablishmentData>('/establishment-contacts', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  revalidateTag('establishment-contacts');

  return response;
}
