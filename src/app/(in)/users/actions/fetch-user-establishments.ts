'use server';

import { api } from '@/lib/api';

export interface UserEstablishment {
  id: string;
  establishmentId: string;
  userId: string;
}

export async function fetchUserEstablishments(id: string) {
  const response = await api<UserEstablishment[]>(
    `/users/establishments/${id}`
  );

  return response;
}
