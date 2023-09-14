'use client';

import './globals.css';
import { SaasProvider } from '@saas-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';
import Link from '~/components/Link';

export default function Providers({ children }) {
  return (
    <CacheProvider>
      <SaasProvider linkComponent={Link}>{children}</SaasProvider>
    </CacheProvider>
  );
}
