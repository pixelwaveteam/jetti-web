'use server';

import { api } from '@/lib/api';

export type PercentageOutOfDistribution = 'JETTI' | 'TOTAL' | 'ESTABLISHMENT';

export interface EstablishmentDistribution {
  id: string;
  establishmentId: string;
  name: string;
  description: string | null;
  percentageOutOf: PercentageOutOfDistribution;
  percentage: number;
  totalPercentage: number;
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
