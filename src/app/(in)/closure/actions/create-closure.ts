'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';
import { Closure } from './fetch-closure';

interface CreateClosure {
  cashFlows: string;
  expenses: string;
}

export async function createClosure(data: CreateClosure) {
  const response = await api<Closure>('/closures', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  revalidateTag('closures');
  revalidateTag('closures-expenses');

  return response;
}
