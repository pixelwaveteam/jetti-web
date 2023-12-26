'use server';

import { TerminalData } from '@/app/(in)/terminals/columns';
import { api } from '@/lib/api';

export async function fetchTerminal(id: string) {
  const response = await api<TerminalData>(`/terminals/${id}`);

  return response;
}
