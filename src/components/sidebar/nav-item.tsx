'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavItem } from '@/components/sidebar/constant-nav-items';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/utils/style';

interface NavItemProps {
  item: NavItem;
}

export function NavItem({ item }: NavItemProps) {
  const pathname = usePathname();
  const { isCollapsed } = useSidebar();

  const Icon = item.icon;

  const pathSlashes = pathname.match(/\//g)

  const isActive = pathname === item.path || (pathSlashes && pathSlashes.length > 1 &&  pathname.startsWith(item.path));

  const renderLink = () => {
    return (
      <li className='list-none' key={item.title}>
        <Link
          href={item.path}
          className={cn(
            'flex items-center gap-4 text-gray-300 hover:text-white p-2 rounded-md transition-colors duration-200 ease-in-out hover:bg-gray-900',
            {
              'bg-gray-900 text-indigo-400 hover:text-indigo-300': isActive,
            }
          )}
        >
          <div className='w-6'>
            <Icon />
          </div>
          {!isCollapsed && (
            <span className='font-semibold truncate'>{item.title}</span>
          )}
        </Link>
      </li>
    );
  };

  if (!isCollapsed) return renderLink();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{renderLink()}</TooltipTrigger>
        <TooltipContent
          side='right'
          align='start'
          alignOffset={-12}
          hideWhenDetached={true}
        >
          <p>{item.title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
