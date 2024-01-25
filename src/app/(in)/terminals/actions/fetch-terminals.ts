'use server';

import { api } from '@/lib/api';

export interface Terminal {
  id: string;
  establishmentId: string;
  interfaceId: string;
  code: number;
  isActive: boolean;
}

export async function fetchTerminals() {
  const response = await api<Terminal[]>('/terminals', {
    next: {
      tags: ['terminals'],
    },
  });

  return response;
}
