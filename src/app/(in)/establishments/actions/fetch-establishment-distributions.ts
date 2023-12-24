'use server';

import { api } from '@/lib/api';
import { z } from 'zod';

const EstablishmentDistributionSchema = z.object({
  id: z.string(),
  establishmentId: z.string(),
  name: z.string(),
  description: z.string().optional(),
  percentage: z.number(),
});

export type EstablishmentDistributionData = z.infer<
  typeof EstablishmentDistributionSchema
>;

export async function fetchEstablishmentDistributions(establishmentId: string) {
  const response = await api<EstablishmentDistributionData[]>(
    `/establishment-distributions/establishment/${establishmentId}`,
    {
      next: {
        tags: ['establishment-distributions'],
      },
    }
  );

  return response;
}
