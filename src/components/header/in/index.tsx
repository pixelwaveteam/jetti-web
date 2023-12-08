'use client';

import { HeaderDesktop } from '@/components/header/in/desktop';
import { HeaderMobile } from '@/components/header/in/mobile';

export function HeaderDashLayout() {
  return (
    <header className='px-4 md:pl-0 h-14 flex z-30 bg-gray-800 border-b border-gray-900 w-full sticky top-0'>
      <HeaderMobile />
      <HeaderDesktop />
    </header>
  );
}
