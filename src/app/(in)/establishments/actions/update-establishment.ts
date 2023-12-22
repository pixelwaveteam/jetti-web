'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

interface UpdateEstablishment {
  id: string;
  data: {
    name: string;
    organizationId: string;
  };
}

export async function updateEstablishment({ id, data }: UpdateEstablishment) {
  await api(`/establishments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  revalidateTag('establishments');
}
