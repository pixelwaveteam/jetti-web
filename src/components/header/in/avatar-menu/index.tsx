'use client';

import { LogOut, Settings, User } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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

export function HeaderAvatarMenu() {
  const router = useRouter();
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);

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

  const handleSignOut = async () => {
    await signOut();

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
          <AvatarFallback>
            {getInitials(session?.user?.name || '')}
          </AvatarFallback>
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
