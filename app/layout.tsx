import Banner from '@/components/Banner';
import { cn } from '@/lib/utils';
import CoinsProvider from '@/providers/crypto/CoinsProvider';
import ExchangesProvider from '@/providers/crypto/ExchangesProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crypto Dashboard',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'flex h-screen flex-col')}>
        <Banner />
        <CoinsProvider>
          <ExchangesProvider>
            <div className="flex flex-1 overflow-hidden md:grid md:grid-cols-[280px_auto]">
              <Sidebar />
              <div className="flex flex-col overflow-auto">{children}</div>
            </div>
          </ExchangesProvider>
        </CoinsProvider>
      </body>
    </html>
  );
}
