'use server';

import { api } from '@/lib/api';

export interface EstablishmentAddress {
  id: string;
  establishmentId: string;
  street: string;
  number: string;
  additional: string | null;
  district: string;
  city: string;
  state: string;
  zipCode: string | null;
}

export async function fetchEstablishmentAddress(establishmentId: string) {
  const response = await api<EstablishmentAddress[]>(
    `/establishment-adresses/establishment/${establishmentId}`,
    {
      next: {
        tags: ['establishment-address'],
      },
    }
  );

  return response[0];
}
