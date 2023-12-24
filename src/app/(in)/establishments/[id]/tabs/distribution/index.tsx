import { CardContentEstablishmentDistribution } from '@/app/(in)/establishments/[id]/tabs/distribution/card-content';
import { fetchEstablishmentDistributions } from '@/app/(in)/establishments/actions/fetch-establishment-distributions';
import { EstablishmentData } from '@/app/(in)/establishments/columns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface TabDistributionProps {
  establishment: EstablishmentData;
}

export async function TabDistribution({ establishment }: TabDistributionProps) {
  const establishmentDistributions = await fetchEstablishmentDistributions(
    establishment.id
  );

  const totalPercentageOnDistribution =
    establishmentDistributions.reduce((acc, cur) => acc + cur.percentage, 0) /
    100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className='flex items-center justify-between'>
            <h3>Distribuição de Lucros</h3>
            <div className='flex'>
              <Progress
                value={totalPercentageOnDistribution}
                className='w-[20vw]'
              />
              <span className='ml-2 text-sm text-gray-300'>
                {totalPercentageOnDistribution}%
              </span>
            </div>
          </div>
        </CardTitle>
        <CardDescription>
          Informações sobre a distribuição de lucros % para cada leitura
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <CardContentEstablishmentDistribution
          establishmentId={establishment.id}
          establishmentDistributions={establishmentDistributions}
        />
      </CardContent>
    </Card>
  );
}
