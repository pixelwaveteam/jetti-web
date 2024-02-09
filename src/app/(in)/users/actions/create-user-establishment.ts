'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

interface CreateUserEstablishment {
  establishmentId: string;
  userId: string;
}

export async function createUserEstablishment(data: CreateUserEstablishment) {
  await api('/users/establishments', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  revalidateTag('users');
}
