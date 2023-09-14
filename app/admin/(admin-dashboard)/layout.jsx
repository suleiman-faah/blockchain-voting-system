'use client';

import { Image, Progress } from '@chakra-ui/react';
import {
  AppShell,
  Sidebar,
  SidebarToggleButton,
  SidebarSection,
  NavItem,
  Web3Address,
} from '@saas-ui/react';
import { House, UserPlus, Swap, ChartPieSlice, SignOut } from '@phosphor-icons/react';
import { usePathname } from 'next/navigation';
import PageTitle from '~/components/PageTitle';

/**
 * @typedef {('home' | 'add-candidates' | 'change-state' | 'analytics' | 'log-out')} DashboardPageSlug
 * @typedef {{slug: DashboardPageSlug, name: string}} DashboardPage
 */

/**
 * @type {[DashboardPage]}
 */
const pages = [
  {
    name: 'Candidate Details',
    slug: 'home',
    icon: House,
  },
  {
    name: 'Add Candidates',
    slug: 'add-candidates',
    icon: UserPlus,
  },
  {
    name: 'Change State',
    slug: 'change-state',
    icon: Swap,
  },
  {
    name: 'Analytics',
    slug: 'analytics',
    icon: ChartPieSlice,
  },
];

const DashboardLayout = ({ children }) => {
  const pathname = usePathname();

  /**
   * @param {string} _pathname
   */
  function pathnameToPageTitle(_pathname) {
    const segments = _pathname.split('/').filter((s) => s !== '');
    if (segments.length === 1) {
      return pages[0];
    }
    return pages.find((p) => p.slug === segments[1]);
  }

  /**
   * @param {MouseEvent} e
   */
  function onLogout(e) {
    e.preventDefault();
    console.log('onLogout');
  }

  return (
    <>
      <AppShell
        className="h-screen w-screen"
        sidebar={
          <Sidebar>
            <SidebarToggleButton />
            <SidebarSection direction="row" className="flex items-center">
              <Image src="https://saas-ui.dev/favicons/favicon-96x96.png" boxSize="7" />

              <Web3Address address="0x71C7656EC7ab88b098defB751B7401B5f6d8976F" className="ml-2" />
            </SidebarSection>
            <SidebarSection aria-label="Main">
              {pages.map((page) => (
                <NavItem
                  key={page.slug}
                  href={'/admin/' + (page.slug === 'home' ? '' : page.slug)}
                  icon={
                    <page.icon
                      size={20}
                      weight={page.slug === pathnameToPageTitle(pathname).slug ? 'fill' : 'regular'}
                    />
                  }
                  isActive={page.slug === pathnameToPageTitle(pathname).slug}
                >
                  {page.name}
                </NavItem>
              ))}
              <NavItem icon={<SignOut size={20} />} onClick={onLogout}>
                Log out
              </NavItem>
            </SidebarSection>
          </Sidebar>
        }
      >
        <main className="flex flex-col h-full">
          <PageTitle title={pathnameToPageTitle(pathname).name} />

          <section className="p-4 grow overflow-y-auto">{children}</section>
        </main>
      </AppShell>
    </>
  );
};

export default DashboardLayout;
