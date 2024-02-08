import { Toaster } from '@/components/ui/toaster';
import { AppProvider } from '@/providers/app-provider';
import '@/styles/globals.css';
import { cn } from '@/utils/style';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Jetti',
  description: 'Controle de receita em terminais com interfaces interativas',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn('bg-background font-sans antialiased', fontSans.variable)}
      >
        <AppProvider>{children}</AppProvider>
        <Toaster />
        <SpeedInsights />
      </body>
    </html>
  );
}
