'use server';

import { api } from '@/lib/api';
import { User } from './fetch-users';

export async function fetchUser(id: string) {
  const response = await api<User>(`/users/${id}`);

  return response;
}
