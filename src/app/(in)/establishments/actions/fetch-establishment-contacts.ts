'use server';

import { api } from '@/lib/api';
import { z } from 'zod';

const EstablishmentContactSchema = z.object({
  id: z.string(),
  establishmentId: z.string(),
  name: z.string(),
  phone: z.string(),
});

export type EstablishmentContactData = z.infer<
  typeof EstablishmentContactSchema
>;

export async function fetchEstablishmentContacts(establishmentId: string) {
  const response = await api<EstablishmentContactData[]>(
    `/establishment-contacts/establishment/${establishmentId}`,
    {
      next: {
        tags: ['establishment-contacts'],
      },
    }
  );

  return response;
}
