'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

interface UpdateUser {
  id: string;
  data: {
    name: string;
    username: string;
    role: 'ADMIN' | 'OPERATOR';
  };
}

export async function updateUser({ id, data }: UpdateUser) {
  await api(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  revalidateTag('users');
}
