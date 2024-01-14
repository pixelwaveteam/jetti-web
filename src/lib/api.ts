'use server';

import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { env } from '@/utils/env';

export async function api<T = any>(
  path: string,
  options: RequestInit = {
    method: 'GET',
  }
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

  const url = `${env.NEXT_PUBLIC_API_URL}${path}`;

  return fetch(url, {
    method,
    headers,
    ...moreOptions,
  })
    .then(async (response) => {
      try {
        const content = await response.json();

        return content as T;
      } catch (err) {
        return null as unknown as T;
      }
    })
    .catch((error) => {
      console.error('API FETCH', error);

      throw new Error(error);
    });
}
