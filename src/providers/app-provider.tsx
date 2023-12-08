'use client';

import { ReactNode } from 'react';

import { QueryProvider } from '@/providers/query-provider';
import { SidebarProvider } from '@/providers/sidebar-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { SessionProvider } from 'next-auth/react';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='dark'
        enableSystem
        disableTransitionOnChange
      >
        <QueryProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </QueryProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
