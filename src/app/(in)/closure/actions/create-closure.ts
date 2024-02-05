'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

interface CreateClosure {
  cashFlows: string
}

export async function createClosure(data: CreateClosure) {
  const response = await api('/closures', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  revalidateTag('closures');

  return response;
}
