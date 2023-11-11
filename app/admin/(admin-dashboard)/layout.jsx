'use client';

import { House, UserPlus, Swap, ChartPieSlice } from '@phosphor-icons/react';
import Layout from '~/components/Layout';

/**
 * @type {[DashboardPage]}
 */
const pages = [
  {
    name: 'Candidate Details',
    slug: 'home',
    path: '/admin',
    icon: House,
  },
  {
    name: 'Add Candidates',
    slug: 'add-candidates',
    path: '/admin/add-candidates',
    icon: UserPlus,
  },
  {
    name: 'Change State',
    slug: 'change-state',
    path: '/admin/change-state',
    icon: Swap,
  },
  {
    name: 'Analytics',
    slug: 'analytics',
    path: '/admin/analytics',
    icon: ChartPieSlice,
  },
];

const DashboardLayout = ({ children }) => {
  /**
   * @param {MouseEvent} e
   */
  function onLogout(e) {
    e.preventDefault();
    console.log('onLogout');
  }

  return (
    <>
      <Layout userName="Admin" pages={pages} onLogout={onLogout}>
        {children}
      </Layout>
    </>
  );
};

export default DashboardLayout;
