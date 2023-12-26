import { NetDistributionData } from '@/app/(in)/cash-flows/actions/fetch-net-distributions';
import { convertCentsToCurrency } from '@/utils/currency';

interface ListDistributionProps {
  netDistributions: NetDistributionData[];
}

export function ListDistribution({ netDistributions }: ListDistributionProps) {
  return (
    <div className='space-y-4'>
      {netDistributions.map((netDistribution) => {
        const percentage = netDistribution.percentage / 100;
        const amount = convertCentsToCurrency(netDistribution.amount);

        return (
          <div className='flex items-center' key={netDistribution.id}>
            <div className='space-y-1'>
              <p className='text-sm font-medium leading-none'>
                {netDistribution.name}
              </p>
              <p className='text-sm text-muted-foreground'>
                {`${percentage}%`}
              </p>
            </div>
            <div className='ml-auto font-medium'>{amount}</div>
          </div>
        );
      })}
    </div>
  );
}
