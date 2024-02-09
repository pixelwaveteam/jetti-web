'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

export async function deleteUserEstablishment(id: string) {
  await api(`/users/establishments/${id}`, {
    method: 'DELETE',
  });

  revalidateTag('users');
}
