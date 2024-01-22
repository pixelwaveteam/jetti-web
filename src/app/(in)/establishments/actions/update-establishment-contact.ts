'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

interface UpdateEstablishmentContact {
  id: string;
  data: {
    establishmentId: string;
    name: string;
    phone: string;
  };
}

export async function updateEstablishmentContact({
  id,
  data,
}: UpdateEstablishmentContact) {
  await api(`/establishment-contacts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  revalidateTag('establishment-contacts');
}
