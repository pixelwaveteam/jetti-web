'use client';

import { ReactNode, createContext, useState } from 'react';

interface SidebarContextValues {
  isCollapsed: boolean;
  toogleCollapsed: () => void;
}

export const SidebarContext = createContext<SidebarContextValues>(
  {} as SidebarContextValues
);

interface SidebarProviderProps {
  children: ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toogleCollapsed = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isCollapsed, toogleCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}
