'use server';

import { revalidateTag } from 'next/cache';

import { api } from '@/lib/api';

interface CreateUserTerminal {
  terminalId: string;
  userId: string;
}

export async function createUserTerminal(data: CreateUserTerminal) {
  await api('/users/terminals', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  revalidateTag('users');
}
