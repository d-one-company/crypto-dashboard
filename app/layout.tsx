import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { PropsWithChildren } from 'react';
import './globals.css';
import Sidebar from '../components/Sidebar/Sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Crypto Dashboard',
  description: 'Crypto Dashboard',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="flex h-screen flex-wrap overflow-hidden">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
