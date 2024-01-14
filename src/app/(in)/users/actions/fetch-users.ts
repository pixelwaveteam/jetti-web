'use server';

import { UserData } from '@/app/(in)/users/columns';
import { api } from '@/lib/api';

export async function fetchUsers() {
  const response = await api<UserData[]>('/users', {
    next: {
      tags: ['users'],
    },
  });

  return response;
}
