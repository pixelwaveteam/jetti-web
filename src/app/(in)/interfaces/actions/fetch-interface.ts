'use server';

import { api } from '@/lib/api';
import { Interface } from './fetch-interfaces';

export async function fetchInterface(id: string) {
  const response = await api<Interface>(`/interfaces/${id}`, {
    next: {
      tags: ['interfaces'],
    },
  });

  return response;
}
