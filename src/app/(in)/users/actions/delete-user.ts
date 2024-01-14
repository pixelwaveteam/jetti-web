'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

export async function deleteUser(id: string) {
  await api(`/users/${id}`, {
    method: 'DELETE',
  });

  revalidateTag('users');
}
