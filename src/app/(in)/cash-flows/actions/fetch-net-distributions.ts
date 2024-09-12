'use server';

import { api } from '@/lib/api';

export interface NetDistributionData {
  id: string;
  cashFlowId: string;
  name: string;
  description: string | null;
  percentage: number;
  displayPercentage: number;
  amount: number;
}

export async function fetchNetDistributions(cashFlowId: string) {
  const response = await api<NetDistributionData[]>(
    `/net-distributions/${cashFlowId}`,
    {
      next: {
        tags: ['net-distributions'],
      },
    }
  );

  return response;
}
