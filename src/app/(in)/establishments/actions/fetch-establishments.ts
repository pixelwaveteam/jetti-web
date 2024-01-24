'use server';

import { api } from '@/lib/api';

export interface Establishment {
  id: string;
  organizationId: string;
  name: string;
  isActive: boolean;
}

export async function fetchEstablishments() {
  const response = await api<Establishment[]>('/establishments', {
    next: {
      tags: ['establishments'],
    },
  });

  return response;
}
