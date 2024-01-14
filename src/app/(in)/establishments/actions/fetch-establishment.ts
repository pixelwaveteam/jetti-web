'use server';

import { EstablishmentData } from '@/app/(in)/establishments/columns';
import { api } from '@/lib/api';

export async function fetchEstablishment(id: string) {
  const response = await api<EstablishmentData>(`/establishments/${id}`);

  return response;
}
