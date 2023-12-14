'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

interface CreateOrganization {
  name: string;
}

export async function createOrganization(data: CreateOrganization) {
  await api('/organizations', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  revalidateTag('organizations');
}
