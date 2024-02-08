'use server';

import { api } from '@/lib/api';

export interface Closure {
  id: string;
  organizationId: string;
  closerId: string;
  gross: number;
  net: number;
  createdAt: Date;
  updatedAt?: Date;
}

export async function fetchClosure(id: string) {
  const response = await api<Closure>(`/closures/${id}`);

  return response;
}
