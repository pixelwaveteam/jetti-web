'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';
import { PercentageOutOfDistribution } from './fetch-establishment-distributions';

interface UpdateEstablishmentDistribution {
  id: string;
  data: {
    establishmentId: string;
    name: string;
    description?: string;
    percentage: number;
    percentageOutOf?: PercentageOutOfDistribution;
};
}

export async function updateEstablishmentDistribution({
  id,
  data,
}: UpdateEstablishmentDistribution) {
  const result = await api(`/establishment-distributions/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  if (result?.statusCode === 400) {
    throw new Error(result.message);
  }

  revalidateTag('establishment-distributions');
}
