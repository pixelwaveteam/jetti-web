import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='container space-y-12'>
      <div className='flex items-center justify-between'>
        <Skeleton className='w-[200px] h-[30px]' />
        <Skeleton className='w-[150px] h-[30px]' />
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Skeleton className='h-[100px] col-span-1' />
        <Skeleton className='h-[100px] col-span-1' />
        <Skeleton className='h-[100px] col-span-1' />
        <Skeleton className='h-[100px] col-span-1' />
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <Skeleton className='h-[500px] col-span-2' />
        <Skeleton className='h-[500px] col-span-2' />
      </div>
    </div>
  );
}
