'use server';

import { api } from '@/lib/api';

export async function fetchUserOrganizations(id: string) {
  const response = await api<{ organizationId: string, userId: string, id: string }[]>(`/users/organizations/${id}`);

  return response;
}
