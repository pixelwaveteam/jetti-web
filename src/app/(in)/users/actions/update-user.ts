'use server';

import { api } from '@/lib/api';
import { revalidateTag } from 'next/cache';

interface UpdateUser {
  id: string;
  data: {
    name: string;
  };
}

export async function updateUser({ id, data }: UpdateUser) {
  await api(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  revalidateTag('users');
}
