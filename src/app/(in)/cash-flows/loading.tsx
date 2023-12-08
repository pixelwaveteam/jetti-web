import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='container space-y-12'>
      <div className='space-y-2'>
        <Skeleton className='w-[100px] h-[30px]' />
        <Skeleton className='w-[300px] h-[30px]' />
      </div>

      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between mb-6'>
          <Skeleton className='w-[50vw] h-[30px]' />
          <Skeleton className='w-[20vw] h-[30px]' />
        </div>

        {Array(8)
          .fill(null)
          .map((_, index) => (
            <Skeleton key={index} className='w-full h-[40px]' />
          ))}
      </div>
    </div>
  );
}
