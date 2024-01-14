'use server';

import { EstablishmentData } from '@/app/(in)/establishments/columns';
import { api } from '@/lib/api';

export async function fetchEstablishments() {
  const response = await api<EstablishmentData[]>('/establishments', {
    next: {
      tags: ['establishments'],
    },
  });

  return response;
}
