import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  title: string;
  action?: ReactNode;
}

export function PageContainer({ title, action, children }: PageContainerProps) {
  return (
    <div className='flex-1 space-y-4'>
      <div className='flex items-center justify-between space-y-2'>
        <h2 className='text-3xl font-bold tracking-tight'>{title}</h2>
        <div className='flex items-center space-x-2'>{action}</div>
      </div>
      {children}
    </div>
  );
}
