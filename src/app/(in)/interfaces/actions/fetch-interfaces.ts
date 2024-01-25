'use server';

import { api } from '@/lib/api';

export interface Interface {
  id: string;
  name: string;
}

export async function fetchInterfaces() {
  const response = await api<Interface[]>('/interfaces', {
    next: {
      tags: ['interfaces'],
    },
  });

  return response;
}
