'use client';

import { ReactNode } from 'react';

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
        <SidebarProvider>{children}</SidebarProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
