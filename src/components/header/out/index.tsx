import Image from 'next/image';

import Logo from '@/assets/logo.svg';

interface HeaderAuthLayoutProps {
  description: string;
}

export function HeaderAuthLayout({ description }: HeaderAuthLayoutProps) {
  return (
    <header className='flex items-center flex-col gap-4 w-full'>
      <Image src={Logo} alt='Logo' />
      <h2 className='font-semibold text-lg'>{description}</h2>
      <div className='h-[.5px] w-full bg-gray-400' />
    </header>
  );
}
