'use server';

import { api } from '@/lib/api';

export interface Organization {
  id: string;
  name: string;
}

export async function fetchOrganizations() {
  const response = await api<Organization[]>('/organizations', {
    next: {
      tags: ['organizations'],
    },
  });

  return response;
}
