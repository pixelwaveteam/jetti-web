'use server';

import { api } from '@/lib/api';

export interface UserTerminal {
  id: string;
  props: {
    terminalId: string;
    userId: string;
  }
}

export async function fetchUserTerminals(id: string) {
  const response = await api<UserTerminal[]>(`/users/terminals/${id}`);

  return response;
}
