'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

interface CreateEstablishment {
  name: string;
}

export async function createEstablishment(data: CreateEstablishment) {
  await api('/establishments', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  revalidateTag('establishments');
}
