'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

interface CreateTerminal {
  establishmentId: string;
  interfaceId: string;
  code: string;
  isActive: boolean;
}

export async function createTerminal(data: CreateTerminal) {
  await api('/terminals', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  revalidateTag('terminals');
}
