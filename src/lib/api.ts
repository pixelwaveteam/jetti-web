'use server';

import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { env } from '@/utils/env';

export async function api<T = any>(
  path: string,
  options: RequestInit
): Promise<T> {
  const session = await getServerSession(authOptions);

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const accessToken = session?.accessToken;

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const { method = 'GET', ...moreOptions } = options;

  const url = `${env.API_URL}${path}`;

  return fetch(url, {
    method,
    headers,
    ...moreOptions,
  })
    .then(async (response) => {
      const content = await response.json();

      return content as T;
    })
    .catch((err) => {
      console.error('API FETCH', err);

      throw new Error(err);
    });
}
