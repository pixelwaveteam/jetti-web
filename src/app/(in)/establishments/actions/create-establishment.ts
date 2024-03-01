'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';
import { Establishment } from './fetch-establishments';

interface CreateEstablishment {
  organizationId: string;
  name: string;
  isWarehouse: boolean;
}

export async function createEstablishment(data: CreateEstablishment) {
  const response = await api<Establishment>('/establishments', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  revalidateTag('establishments');

  return response;
}
