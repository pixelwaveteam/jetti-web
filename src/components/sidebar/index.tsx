'use client';

import Link from 'next/link';

import { HeaderLogo } from '@/components/header/in/desktop/logo';
import { navItems } from '@/components/sidebar/constant-nav-items';
import { NavItem } from '@/components/sidebar/nav-item';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/utils/style';

export function SideBar() {
  const { isCollapsed } = useSidebar();

  return (
    <aside
      className={cn(
        'hidden w-52 md:flex bg-gray-800 min-h-screen max-h-screen overflow-hidden transition-width duration-200 ease-in-out',
        {
          'w-14': isCollapsed,
        }
      )}
    >
      <nav className='flex flex-col w-full'>
        <div className='h-14 bg-gray-800 border-b border-gray-900 flex items-center pl-6'>
          <div>
            <Link href='/dashboard'>
              <HeaderLogo />
            </Link>
          </div>
        </div>
        <ul className='flex w-full flex-col mt-8 px-2 space-y-4'>
          {navItems.map((item) => (
            <NavItem key={item.title} item={item} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}
