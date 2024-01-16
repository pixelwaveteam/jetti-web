'use client';

import { Menu } from 'lucide-react';

import { MenuNavItem } from '@/components/header/in/mobile/menu-nav-item';
import { navItems } from '@/components/sidebar/constant-nav-items';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={'ghost'} className='p-0'>
          <Menu size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side={'left'} className='flex flex-col gap-4'>
        <span className='uppercase text-gray-400 font-bold text-xs ml-6'>
          menu
        </span>
        <ul className='flex w-full flex-col px-2 space-y-4 overflow-y-auto'>
          {navItems.map((item) => (
            <MenuNavItem key={item.title} item={item} />
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
}
