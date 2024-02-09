'use server';

import { api } from '@/lib/api';

type UserRole = 'ADMIN' | 'OPERATOR';

export interface User {
  id: string;
  avatarId?: string;
  name: string;
  username: string;
  role: UserRole;
  password: string;
  isActive: boolean;
}

export async function fetchUsers() {
  const response = await api<User[]>('/users', {
    next: {
      tags: ['users'],
    },
  });

  return response;
}
