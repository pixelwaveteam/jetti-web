'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';
import { Terminal } from './fetch-terminals';

interface CreateTerminal {
  establishmentId: string;
  interfaceId: string;
  code: string;
  isActive: boolean;
}

export async function createTerminal(data: CreateTerminal) {
  const terminal = await api<Terminal>('/terminals', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  revalidateTag('terminals');

  return terminal
}
