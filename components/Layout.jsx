import React, {useRef, useState, useEffect} from 'react';
import { usePathname } from 'next/navigation';
import {
  AppShell,
  NavItem,
  Sidebar,
  SidebarSection,
  SidebarToggleButton,
  Web3Address,
} from '@saas-ui/react';
import { Image } from '@chakra-ui/react';
import { SignOut } from '@phosphor-icons/react';
import PageTitle from '~/components/PageTitle';
// import { useRouter } from 'next/navigation';
import dotenv from 'dotenv';

dotenv.config();


/**
 * @typedef {('home' | 'add-candidates' | 'change-state' | 'analytics' | 'log-out' | 'voting-area' | 'results')} DashboardPageSlug
 * @typedef {{slug: DashboardPageSlug, name: string, path: string}} DashboardPage
 */

/**
 * @param {React.ReactNode} children
 * @param {DashboardPage[]} pages
 * @param {string?} userName
 * @param {(e: MouseEvent)=>void} onLogout
 * @returns {JSX.Element}
 */
const Layout = ({ children, pages, userName, onLogout }) => {
  const [userAddress, setUserAddress] = useState("");

  // const router = useRouter();

  let userAccount = useRef();
  const getUserAccount = async () => {
    userAccount.current =  await AlgoSigner.accounts({
      ledger: 'TestNet'
    })
    if (userAccount.current) {
      setUserAddress(userAccount.current[0]['address']);
    } else { console.log(`Got nothing for userAddress: ${userAddress}`) }
  }

  useEffect(() => {
    getUserAccount();
  }, [userAddress]);
  // console.log(`User Address: ${userAddress}`)

  const pathname = usePathname();

  // const disconnectWallet = async () => {
  //   console.log("Killing session for wallet with address: ", userAddress);
  //   await AlgoSigner.disconnect();
  //   router.push('/');
  // }

  return (
    <>
      <AppShell
        className="h-screen w-screen"
        sidebar={
          <Sidebar>
            <SidebarToggleButton />
            <SidebarSection direction="row" className="flex items-center">
              <Image src="https://saas-ui.dev/favicons/favicon-96x96.png" boxSize="7" />

              {userName === 'Admin' ? (
                <span className="ml-2">Admin</span>
              ) : (
                <Web3Address
                  address={userAddress ?? '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'}
                  className="ml-2"
                />
              )}
            </SidebarSection>

            <SidebarSection aria-label="Main">
              {pages.map((page) => (
                <NavItem
                  key={page.slug}
                  href={page.path}
                  icon={
                    <page.icon size={20} weight={page.path === pathname ? 'fill' : 'regular'} />
                  }
                  isActive={page.path === pathname}
                >
                  {page.name}
                </NavItem>
              ))}
              <NavItem
                icon={<SignOut size={20} />}
                onClick={(e) => {
                  e.preventDefault();
                  onLogout(e);
                  // disconnectWallet();
                }}
              >
                Log out
              </NavItem>
            </SidebarSection>
          </Sidebar>
        }
      >
        <main className="flex h-full flex-col">
          <PageTitle title={pages.find((p) => p.path === pathname).name} />

          <section className="grow overflow-y-auto p-4">{children}</section>
        </main>
      </AppShell>
    </>
  );
};

export default Layout;
