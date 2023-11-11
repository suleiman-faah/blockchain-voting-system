'use client';

import React from 'react';
import { Inter } from 'next/font/google';
import Providers from './Providers';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {

  return (
    <html lang="en" className="relative">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Blockchain Voting System</title>
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
