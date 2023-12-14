'use client';

import { ReactNode, createContext, useState } from 'react';

interface SheetContextValues {
  show: boolean;
  setShow: (showed: boolean) => void;
}

export const SheetContext = createContext({
  show: false,
} as SheetContextValues);

interface SheetProviderProps {
  children: ReactNode;
}

export function SheetProvider({ children }: SheetProviderProps) {
  const [show, setShow] = useState(false);

  return (
    <SheetContext.Provider value={{ show, setShow }}>
      {children}
    </SheetContext.Provider>
  );
}
