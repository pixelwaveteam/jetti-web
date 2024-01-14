import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface PageContainerProps {
  title: string;
  children?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  goBackUrl?: string;
}

export function PageContainer({
  title,
  description,
  action,
  goBackUrl,
  children,
}: PageContainerProps) {
  return (
    <div className='flex-1 space-y-4'>
      <div className='flex items-center justify-between space-y-2'>
        <div className='flex flex-col'>
          {goBackUrl && (
            <Link
              className='text-indigo-400 text-sm hover:text-indigo-300 flex items-center gap-1'
              href={`${goBackUrl}`}
              tabIndex={3}
            >
              <ChevronLeft size={14} />
              Voltar
            </Link>
          )}
          <h2 className='text-3xl font-bold tracking-tight'>{title}</h2>
          {description && (
            <span className='text-sm text-muted-foreground font-medium'>
              {description}
            </span>
          )}
        </div>

        {action && <div className='flex items-center space-x-2'>{action}</div>}
      </div>
      {children}
    </div>
  );
}
