import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { api } from '@/lib/api';
import { env } from '@/utils/env';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('Credenciais não informadas');
        }

        const { email, password } = credentials;

        const response = await api('/sessions', {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (response.statusCode === 401) {
          throw new Error('Credenciais inválidas');
        }

        return response;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update') {
        return {
          ...token,
          user: {
            ...session.user,
          },
        };
      }

      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;

      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: env.NEXTAUTH_SECRET,
  debug: env.NEXTAUTH_DEBUG,
};
