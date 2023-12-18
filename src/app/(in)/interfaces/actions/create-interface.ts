'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

interface CreateInterface {
  name: string;
}

export async function createInterface(data: CreateInterface) {
  await api('/interfaces', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  revalidateTag('interfaces');
}
