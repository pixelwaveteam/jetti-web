'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

export async function deleteOrganization(id: string) {
  await api(`/organizations/${id}`, {
    method: 'DELETE',
  });

  revalidateTag('organizations');
}
