'use client';

import { Calendar, Laptop, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

export function CommandMenu() {
  const { setTheme } = useTheme();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const navigationCommands = [
    {
      label: 'Bookings',
      icon: <Calendar className='mr-2 h-4 w-4' />,
      onSelect: () => {
        setOpen(false);
        router.push('/bookings');
      },
    },
  ];

  const themeCommands = [
    {
      label: 'Light',
      icon: <Sun className='mr-2 h-4 w-4' />,
      onSelect: () => {
        setOpen(false);
        setTheme('light');
      },
    },
    {
      label: 'Dark',
      icon: <Moon className='mr-2 h-4 w-4' />,
      onSelect: () => {
        setOpen(false);
        setTheme('dark');
      },
    },
    {
      label: 'System',
      icon: <Laptop className='mr-2 h-4 w-4' />,
      onSelect: () => {
        setOpen(false);
        setTheme('system');
      },
    },
  ];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();

        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);

    return () => document.removeEventListener('keydown', down);
  }, [setTheme]);

  return (
    <>
      <Button
        variant={'outline'}
        size={'sm'}
        onClick={() => setOpen((open) => !open)}
      >
        <p className='text-sm text-muted-foreground'>
          Quick Menu{' '}
          <kbd className='pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
            <span className='text-xs'>⌘</span>k
          </kbd>
        </p>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder='Type a command or search...' />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Navigation'>
            {navigationCommands.map((command, index) => (
              <CommandItem
                key={index}
                className='hover:cursor-pointer'
                onSelect={command.onSelect}
              >
                {command.icon}
                <span>{command.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading='Appearance'>
            {themeCommands.map((command, index) => (
              <CommandItem
                key={index}
                className='hover:cursor-pointer'
                onSelect={command.onSelect}
              >
                {command.icon}
                <span>{command.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
