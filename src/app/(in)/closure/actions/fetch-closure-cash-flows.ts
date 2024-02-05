'use server';

import { api } from '@/lib/api';

interface ServerClosureCashFlow {
  id: string;
  props: {
    closureId: string;
    cashFlowId: string;
  }
}

export interface ClosureCashFlow {
  id: string;
  closureId: string;
  cashFlowId: string;
}

export async function fetchClosureCashFlows(id: string) {
  const response = await api<ServerClosureCashFlow[]>(`/closures/cash-flows/${id}`);

  const formattedResponse: ClosureCashFlow[] = response.map(entry => ({ id: entry.id, ...entry.props }))

  return formattedResponse;
}
