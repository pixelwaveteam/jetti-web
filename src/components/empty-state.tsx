import { cx } from 'class-variance-authority';
import { Plus } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';

interface EmptyStateProps extends ButtonHTMLAttributes<HTMLButtonElement> { 
  label: string;
}

export function EmptyState({ label, className, ...props }: EmptyStateProps) {
  return (
    <button
      type='button'
      className={cx(className, 'relative flex gap-4 items-center justify-center w-full rounded-md border border-dashed border-gray-500 p-12 text-center hover:border-gray-400 hover:bg-gray-900 transition-all')}
      {...props}
    >
      <Plus size={24} />
      <span className='font-semibold'>{label}</span>
    </button>
  );
}
