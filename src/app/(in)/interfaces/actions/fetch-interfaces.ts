'use server';

import { InterfaceData } from '@/app/(in)/interfaces/columns';
import { api } from '@/lib/api';

export async function fetchInterfaces() {
  const response = await api<InterfaceData[]>('/interfaces', {
    next: {
      tags: ['interfaces'],
    },
  });

  return response;
}
