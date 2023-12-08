import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import { AppProvider } from '@/providers/app-provider';
import '@/styles/globals.css';
import { cn } from '@/utils/style';

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Jetti',
  description: 'Controle de receita em terminais de jogos de azar',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html className={fontSans.variable} lang='en'>
      <body
        className={cn('bg-background font-sans antialiased', fontSans.variable)}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
