import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      username: string;
      role: 'ADMIN' | 'OPERATOR';
    };
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: string;
      name: string;
      username: string;
      role: 'ADMIN' | 'OPERATOR';
    };
    accessToken: string;
  }
}
