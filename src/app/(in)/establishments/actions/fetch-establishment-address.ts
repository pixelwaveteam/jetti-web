'use server';

import { api } from '@/lib/api';
import { z } from 'zod';

const EstablishmentAddressSchema = z.object({
  id: z.string(),
  establishmentId: z.string(),
  street: z.string(),
  number: z.string(),
  additional: z.string().nullable(),
  district: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
});

export type EstablishmentAddressData = z.infer<
  typeof EstablishmentAddressSchema
>;

export async function fetchEstablishmentAddress(establishmentId: string) {
  const response = await api<EstablishmentAddressData[]>(
    `/establishment-adresses/${establishmentId}`,
    {
      next: {
        tags: ['establishment-address'],
      },
    }
  );

  return response[0];
}
