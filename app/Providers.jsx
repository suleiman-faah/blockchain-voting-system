'use client';

import React from 'react';

import './globals.css';
import { SaasProvider } from '@saas-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';
import Link from '~/components/Link';
import { Provider } from 'react-redux';
import store from '~/redux/store';

export default function Providers({ children }) {

  return (
    <Provider store={store}>
      <CacheProvider>
        <SaasProvider linkComponent={Link}>{children}</SaasProvider>
      </CacheProvider>
    </Provider>
  );
}
