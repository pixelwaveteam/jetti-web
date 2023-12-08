'use client';

import { LogOut, Settings, User } from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getInitials } from '@/utils/text';
import { useRouter } from 'next/navigation';

export function HeaderAvatarMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const toogleMenu = () => {
    setOpen(!open);
  };

  const handleProfile = () => {
    router.push('/profile');
    setOpen(false);
  };

  const handleSettings = () => {
    router.push('/settings');
    setOpen(false);
  };

  const handleSignOut = () => {
    router.push('/api/auth/signout');
    setOpen(false);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger
        asChild
        className='hover:cursor-pointer'
        onSelect={toogleMenu}
      >
        <Avatar>
          <AvatarImage src='https://github.com/ruverd.png' />
          <AvatarFallback>{getInitials('Ruver Dornelas')}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Ruver Dornelas</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className='hover:cursor-pointer'
            onSelect={handleProfile}
          >
            <User className='mr-2 h-4 w-4' />
            <span>Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className='hover:cursor-pointer'
            onSelect={handleSettings}
          >
            <Settings className='mr-2 h-4 w-4' />
            <span>Configurações</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='hover:cursor-pointer'
          onSelect={handleSignOut}
        >
          <LogOut className='mr-2 h-4 w-4' />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
