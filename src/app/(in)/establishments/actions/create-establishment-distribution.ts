'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';
import { PercentageOutOfDistribution } from './fetch-establishment-distributions';

interface CreateEstablishmentDistribution {
  establishmentId: string;
  name: string;
  description: string;
  percentage: number;
  percentageOutOf: PercentageOutOfDistribution;
}

export async function createEstablishmentDistribution(
  data: CreateEstablishmentDistribution
) {
  const result = await api('/establishment-distributions', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (result?.statusCode === 400) {
    throw new Error(result.message);
  }

  revalidateTag('establishment-distributions');
}
