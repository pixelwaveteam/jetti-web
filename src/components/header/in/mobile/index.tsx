'use client';

import Image from 'next/image';
import Link from 'next/link';

import Logo from '@/assets/logo.svg';
import { HeaderAvatarMenu } from '@/components/header/in/avatar-menu';
import { MobileMenu } from '@/components/header/in/mobile/menu';

export function HeaderMobile() {
  return (
    <div className='flex md:hidden justify-between items-center w-full'>
      <MobileMenu />
      <Link href='/dashboard'>
        <Image src={Logo} alt='Logo' />
      </Link>
      <HeaderAvatarMenu />
    </div>
  );
}
