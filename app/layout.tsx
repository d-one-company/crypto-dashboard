import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SessionProvider from '@/providers/SessionProvider';
import CoinsProvider from '@/providers/crypto/CoinsProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <CoinsProvider>{children}</CoinsProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
