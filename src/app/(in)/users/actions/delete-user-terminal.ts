'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

export async function deleteUserTerminal(id: string) {
  await api(`/users/terminals/${id}`, {
    method: 'DELETE',
  });

  revalidateTag('users');
}
