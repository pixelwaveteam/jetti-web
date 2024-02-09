'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

interface CreateUser {
  name: string;
  username: string;
  role: 'ADMIN' | 'OPERATOR';
  password: string;
}

export async function createUser(data: CreateUser) {
  await api('/users', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  revalidateTag('users');
}
