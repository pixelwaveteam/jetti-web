'use server';

import { User } from '@/app/(in)/users/columns';
import { api } from '@/lib/api';

export async function fetchUser(id: string) {
  const response = await api<User>(`/users/${id}`);

  return response;
}
