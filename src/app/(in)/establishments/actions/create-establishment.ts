'use server';

import { revalidateTag } from 'next/cache';

import { EstablishmentData } from '@/app/(in)/establishments/columns';
import { api } from '@/lib/api';

interface CreateEstablishment {
  organizationId: string;
  name: string;
}

export async function createEstablishment(data: CreateEstablishment) {
  const response = await api<EstablishmentData>('/establishments', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  revalidateTag('establishments');

  return response;
}
