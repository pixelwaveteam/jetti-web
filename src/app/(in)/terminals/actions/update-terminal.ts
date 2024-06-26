'use server';

import { api } from '@/lib/api';
import { revalidateTag } from 'next/cache';

interface UpdateTerminal {
  id: string;
  data: {
    establishmentId: string;
    interfaceId: string;
    isActive: boolean;
    input: number;
    output: number;
  };
}

export async function updateTerminal({ id, data }: UpdateTerminal) {
  await api(`/terminals/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  revalidateTag('terminals');
}
