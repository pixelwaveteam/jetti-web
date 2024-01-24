'use server';

import { api } from '@/lib/api';

export interface UserOrganization {
  id: string
  organizationId: string;
  userId: string; 
}

export async function fetchUserOrganizations(id: string) {
  const response = await api<UserOrganization[]>(`/users/organizations/${id}`);
  console.log({response})

  return response;
}
