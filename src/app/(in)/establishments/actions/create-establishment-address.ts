'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';
import { EstablishmentAddress } from './fetch-establishment-address';

interface CreateEstablishmentAddress {
  establishmentId: string;
  street: string;
  number: string;
  additional: string | null;
  district: string;
  city: string;
  state: string;
  zipCode: string;
}

export async function createEstablishmentAddress(
  data: CreateEstablishmentAddress
) {
  const response = await api<EstablishmentAddress>(
    '/establishment-adresses',
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );

  revalidateTag('establishment-address');

  return response;
}
