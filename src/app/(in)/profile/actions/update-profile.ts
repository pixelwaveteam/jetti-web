'use server';

import { api } from '@/lib/api';

interface UpdateProfile {
  name: string;
  role: 'ADMIN' | 'OPERATOR';
}

export async function updateProfile(data: UpdateProfile) {
  await api(`/profile`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}
