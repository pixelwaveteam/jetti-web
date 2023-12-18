'use server';

import { api } from '@/lib/api';
import { revalidateTag } from 'next/cache';

interface UpdateEstablishment {
  id: string;
  data: {
    name: string;
  };
}

export async function updateEstablishment({ id, data }: UpdateEstablishment) {
  await api(`/establishments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  revalidateTag('establishments');
}
