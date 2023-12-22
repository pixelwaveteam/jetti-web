import { Plus } from 'lucide-react';

interface EmptyStateProps {
  label: string;
}

export function EmptyState({ label }: EmptyStateProps) {
  return (
    <button
      type='button'
      className='relative flex gap-4 items-center justify-center w-full rounded-md border border-dashed border-gray-500 p-12 text-center hover:border-gray-400 hover:bg-gray-900 transition-all'
    >
      <Plus size={24} />
      <span className='font-semibold'>{label}</span>
    </button>
  );
}
