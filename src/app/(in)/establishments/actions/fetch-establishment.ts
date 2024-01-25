'use server';

import { api } from '@/lib/api';
import { Establishment } from './fetch-establishments';

export async function fetchEstablishment(id: string) {
  const response = await api<Establishment>(`/establishments/${id}`);

  return response;
}
