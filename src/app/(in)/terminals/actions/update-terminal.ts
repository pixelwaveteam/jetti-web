'use server';

import { api } from '@/lib/api';
import { revalidateTag } from 'next/cache';

interface UpdateTerminal {
  id: string;
  data: {
    name: string;
  };
}

export async function updateTerminal({ id, data }: UpdateTerminal) {
  await api(`/terminals/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  revalidateTag('terminals');
}
