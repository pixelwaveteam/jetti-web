'use server';

import { revalidateTag } from 'next/cache';

import { EstablishmentAddressData } from '@/app/(in)/establishments/actions/fetch-establishment-address';
import { api } from '@/lib/api';

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
  const response = await api<EstablishmentAddressData>(
    '/establishment-adresses',
    {
      method: 'POST',
      body: JSON.stringify(data),
    }
  );

  revalidateTag('establishment-address');

  return response;
}
