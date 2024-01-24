'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

export async function deleteUserOrganization(id: string) {
  await api(`/users/organizations/${id}`, {
    method: 'DELETE',
  });

  revalidateTag('users');
}
