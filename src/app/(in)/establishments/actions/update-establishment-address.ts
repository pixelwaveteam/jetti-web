'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

interface UpdateEstablishmentAddress {
  id: string;
  data: {
    establishmentId: string;
    street: string;
    number: string;
    additional?: string;
    district: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export async function updateEstablishmentAddress({
  id,
  data,
}: UpdateEstablishmentAddress) {
  await api(`/establishment-adresses/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  revalidateTag('establishment-address');
}
