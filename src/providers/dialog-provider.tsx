'use client';

import { ReactNode, createContext, useState } from 'react';

interface DialogContextValues {
  show: boolean;
  setShow: (showed: boolean) => void;
}

export const DialogContext = createContext({
  show: false,
} as DialogContextValues);

interface DialogProviderProps {
  children: ReactNode;
}

export function DialogProvider({ children }: DialogProviderProps) {
  const [show, setShow] = useState(false);

  return (
    <DialogContext.Provider value={{ show, setShow }}>
      {children}
    </DialogContext.Provider>
  );
}
