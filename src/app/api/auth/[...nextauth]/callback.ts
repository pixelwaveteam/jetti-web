import { Account, CallbacksOptions, Profile } from 'next-auth';

export const nextAuthCallback: Partial<CallbacksOptions<Profile, Account>> = {
  async jwt({ token, user, trigger, session }) {
    if (trigger === 'update') {
      return { token, ...session.user };
    }

    return { ...token, ...user };
  },
  async session({ session, token }) {
    session.user = token.user;
    session.accessToken = token.accessToken;

    return session;
  },
};
