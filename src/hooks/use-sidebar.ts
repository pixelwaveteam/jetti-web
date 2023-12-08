import { SidebarContext } from '@/providers/sidebar-provider';
import { useContext } from 'react';

export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context)
    throw new Error('useSidebar must be used inside a SidebarProvider');

  return context;
}
