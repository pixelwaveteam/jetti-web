import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { env } from '@/utils/env';

import { nextAuthCallback } from './callback';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('credentials', credentials);
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;

        const signInResponse = await fetch(`${env.API_URL}/sessions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const user = await signInResponse.json();

        if (user && signInResponse.ok) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: nextAuthCallback,
  pages: {
    signIn: '/sign-in',
  },
  debug: env.NEXTAUTH_DEBUG || false,
};
