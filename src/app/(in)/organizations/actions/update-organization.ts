'use server';

import { api } from '@/lib/api';
import { revalidateTag } from 'next/cache';

interface UpdateOrganization {
  id: string;
  data: {
    name: string;
  };
}

export async function updateOrganization({ id, data }: UpdateOrganization) {
  await api(`/organizations/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  revalidateTag('organizations');
}
