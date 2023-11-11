'use client';

import { ChartBarHorizontal, FlagPennant } from '@phosphor-icons/react';
import Layout from '~/components/Layout';

/**
 * @typedef {('home' | 'voting-area' | 'results' | 'analytics' | 'log-out')} DashboardPageSlug
 * @typedef {{slug: DashboardPageSlug, name: string, path: string}} DashboardPage
 */

/**
 * @type {[DashboardPage]}
 */
const pages = [
  {
    name: 'Voting Area',
    slug: 'home',
    path: '/voter',
    icon: ChartBarHorizontal,
  },
  {
    name: 'Results',
    slug: 'results',
    path: '/voter/results',
    icon: FlagPennant,
  },
];

const VotersDashboardLayout = ({ children }) => {
  /**
   * @param {MouseEvent} e
   */


  function onLogout(e) {
    e.preventDefault();
    console.log('onLogout');
  }

  return (
    <>
      <Layout pages={pages} onLogout={onLogout}>
        {children}
      </Layout>
    </>
  );
};

export default VotersDashboardLayout;
