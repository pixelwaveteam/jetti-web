'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

interface CreateUserOrganization {
  organizationId: string;
  userId: string;
}

export async function createUserOrganization(data: CreateUserOrganization) {
  await api('/users/organizations', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  revalidateTag('users');
}
