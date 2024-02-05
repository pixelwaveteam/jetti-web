'use server';

import { api } from '@/lib/api';
import { Organization } from './fetch-organizations';

export async function fetchOrganization(id: string) {
  const response = await api<Organization>(`/organizations/${id}`);

  return response;
}
