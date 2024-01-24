'use server';

import { InterfaceData } from '@/app/(in)/interfaces/columns';
import { api } from '@/lib/api';

export async function fetchInterface(id: string) {
  const response = await api<InterfaceData>(`/interfaces/${id}`, {
    next: {
      tags: ['interfaces'],
    },
  });

  return response;
}
