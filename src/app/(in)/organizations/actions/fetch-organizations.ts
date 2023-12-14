'use server';

import { OrganizationData } from '@/app/(in)/organizations/columns';
import { api } from '@/lib/api';

export async function fetchOrganizations() {
  const response = await api<OrganizationData[]>('/organizations', {
    next: {
      tags: ['organizations'],
    },
  });

  return response;
}
