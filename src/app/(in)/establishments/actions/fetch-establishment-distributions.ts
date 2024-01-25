'use server';

import { api } from '@/lib/api';

export interface EstablishmentDistribution {
  id: string;
  establishmentId: string;
  name: string;
  description: string | null;
  percentage: number;
}

export async function fetchEstablishmentDistributions(establishmentId: string) {
  const response = await api<EstablishmentDistribution[]>(
    `/establishment-distributions/establishment/${establishmentId}`,
    {
      next: {
        tags: ['establishment-distributions'],
      },
    }
  );

  return response;
}
