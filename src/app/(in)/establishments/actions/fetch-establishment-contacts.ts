'use server';

import { api } from '@/lib/api';

export interface EstablishmentContact {
  id: string;
  establishmentId: string;
  name: string;
  phone: string;
}

export async function fetchEstablishmentContacts(establishmentId: string) {
  const response = await api<EstablishmentContact[]>(
    `/establishment-contacts/establishment/${establishmentId}`,
    {
      next: {
        tags: ['establishment-contacts'],
      },
    }
  );

  return response;
}
