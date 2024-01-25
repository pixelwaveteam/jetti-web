'use server';

import { api } from '@/lib/api';
import { Terminal } from './fetch-terminals';

export async function fetchTerminal(id: string) {
  const response = await api<Terminal>(`/terminals/${id}`);

  return response;
}
