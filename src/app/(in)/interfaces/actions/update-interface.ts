'use server';

import { api } from '@/lib/api';
import { revalidateTag } from 'next/cache';

interface UpdateInterface {
  id: string;
  data: {
    name: string;
  };
}

export async function updateInterface({ id, data }: UpdateInterface) {
  await api(`/interfaces/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  revalidateTag('interfaces');
}
