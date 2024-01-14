'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

export async function deleteTerminal(id: string) {
  await api(`/terminals/${id}`, {
    method: 'DELETE',
  });

  revalidateTag('terminals');
}
