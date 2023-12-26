import { NetDistributionData } from '@/app/(in)/cash-flows/actions/fetch-net-distributions';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { convertCentsToCurrency } from '@/utils/currency';

interface ListDistributionProps {
  netDistributions: NetDistributionData[];
}

export function ListDistribution({ netDistributions }: ListDistributionProps) {
  const totalAmount = netDistributions.reduce(
    (acc, netDistribution) => acc + netDistribution.amount,
    0
  );

  return (
    <div className='space-y-4'>
      {netDistributions.map((netDistribution) => {
        const percentage = netDistribution.percentage / 100;
        const amount = convertCentsToCurrency(netDistribution.amount);

        return (
          <div className='flex items-center' key={netDistribution.id}>
            <div className='space-y-1'>
              <p className='text-sm font-medium leading-none'>
                {netDistribution.name}{' '}
                <Badge color='primary'>{`${percentage}%`}</Badge>
              </p>
            </div>
            <div className='ml-auto font-medium'>{amount}</div>
          </div>
        );
      })}
      <Separator />
      <div className='flex items-center'>
        <div className='space-y-1'>
          <p className='text-sm font-medium leading-none'>Total</p>
        </div>
        <div className='ml-auto font-medium'>
          {convertCentsToCurrency(totalAmount)}
        </div>
      </div>
    </div>
  );
}
