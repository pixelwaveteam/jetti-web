'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

import { Terminal } from './fetch-terminals';

interface CreateTerminal {
  establishmentId: string;
  interfaceId: string;
  isActive: boolean;
  input: number;
  output: number;
}

export async function createTerminal(data: CreateTerminal) {
  const terminal = await api<Terminal>('/terminals', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  revalidateTag('terminals');

  return terminal;
}
