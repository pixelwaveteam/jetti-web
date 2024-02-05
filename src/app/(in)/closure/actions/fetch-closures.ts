'use server';

import { api } from '@/lib/api';

export interface Closure {
  id: string,
  closerId: string;
  organizationId: string;
  gross: number;
  net: number;
  createdAt: Date;
  updatedAt?: Date;
}

export async function fetchClosures() {
  const response = await api<Closure[]>('/closures', {
    next: {
      tags: ['closures'],
    },
  });

  return response;
}
