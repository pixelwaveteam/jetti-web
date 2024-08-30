'use server';

import { api } from '@/lib/api';

export interface ClosureDistribution {
  id: string;
  closureId: string;
  name: string;
  description: string | null;
  amount: number;
  createdAt: Date;
  updatedAt?: Date;
}

export async function fetchClosureDistributions(id: string) {
  const response = await api<ClosureDistribution[]>(`/closures/distributions/${id}`,
    {
      next: {
        tags: ['closures-distributions'],
      },
    }
  );

  return response;
}
