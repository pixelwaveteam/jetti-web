'use client';

import {
  ReactNode,
  createContext
} from 'react';


interface ClosureContextValues {
}

export const ClosureContext = createContext<ClosureContextValues>(
  {} as ClosureContextValues
);

interface ClosureProviderProps {
  children: ReactNode;
  initialData: {
    
  };
}

export function ClosureProvider({
  children,
  initialData,
}: ClosureProviderProps) {

  return (
    <ClosureContext.Provider
      value={{}}
    >
      {children}
    </ClosureContext.Provider>
  );
}
