'use client';

import { AlignLeft, AlignRight } from 'lucide-react';

import { HeaderAvatarMenu } from '@/components/header/in/avatar-menu';
import { CommandMenu } from '@/components/header/in/desktop/command-menu';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/hooks/use-sidebar';

export function HeaderDesktop() {
  const { isCollapsed, toogleCollapsed } = useSidebar();

  const renderIconOnButton = () => {
    return isCollapsed ? <AlignLeft size={24} /> : <AlignRight size={24} />;
  };

  return (
    <div className='hidden md:flex justify-between items-center w-full'>
      <div className='flex gap-4 items-center justify-center pl-1'>
        <Button variant={'ghost'} className='p-0' onClick={toogleCollapsed}>
          {renderIconOnButton()}
        </Button>
      </div>
      <div className='flex gap-2 items-center'>
        <CommandMenu />
        <HeaderAvatarMenu />
      </div>
    </div>
  );
}
