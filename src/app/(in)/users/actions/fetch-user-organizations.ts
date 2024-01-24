'use server';

import { api } from '@/lib/api';

export interface UserOrganization {
  id: string
  props: {
    organizationId: string;
    userId: string; 
  }
}

export async function fetchUserOrganizations(id: string) {
  const response = await api<UserOrganization[]>(`/users/organizations/${id}`);

  return response;
}
