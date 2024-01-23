'use server';

import { api } from '@/lib/api';
import { User } from '@/types/user';

export async function fetchUsers() {
  const response = await api<User[]>('/users', {
    next: {
      tags: ['users'],
    },
  });

  return response;
}
