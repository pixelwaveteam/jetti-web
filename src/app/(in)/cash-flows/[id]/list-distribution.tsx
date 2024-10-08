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

  const formattedToPercentage = (value: number) => {
    return value / 100;
  };

  return (
    <div className='space-y-4'>
      {netDistributions.map((netDistribution) => {
        const percentageDistributionDisplay = formattedToPercentage(
          netDistribution.displayPercentage
        );

        const percentageDistribution = formattedToPercentage(
          netDistribution.percentage
        );

        const amountDistribution = convertCentsToCurrency(
          netDistribution.amount
        );

        return (
          <div className='flex items-center' key={netDistribution.id}>
            <div className='space-x-1'>
              <span className='font-medium leading-none'>
                {netDistribution.name}
              </span>
              {/* {
                establishmentDistribution.percentageOutOf !== 'TOTAL' && (
                  <>
                    <Badge variant='outline'>
                      {establishmentDistribution.percentage / 100}%
                    </Badge>

                    <>
                      {getPercentageOutOfDistributionDisplay(establishmentDistribution.percentageOutOf)}
                    </>
                  </>
                )
              }

              {
                establishmentDistribution.percentageOutOf === "TOTAL" && (
                  <Badge variant='secondary'>
                    {establishmentDistribution.percentage/100}%
                  </Badge>
                )
              } */}
              <Badge color='primary'>{`${percentageDistributionDisplay}%`}</Badge>
            </div>
            <div className='ml-auto font-medium'>{amountDistribution}</div>
          </div>
        );
      })}

      <Separator />

      <div className='flex items-center'>
        <span className='font-medium leading-none'>Total</span>
        <div className='ml-auto font-medium'>
          {convertCentsToCurrency(totalAmount)}
        </div>
      </div>
    </div>
  );
}
