import { Calendar, Laptop, User } from 'lucide-react';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { PageContainer } from '@/components/page-container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getDateFormatted } from '@/utils/date';

import { ClosureProvider } from '@/providers/closure-provider';
import { NetDistributionData } from '../../cash-flows/actions/fetch-net-distributions';
import { ChartDistribution } from './chart-distribution';
import { ListDistribution } from './list-distribution';
import { ClosureStats } from './stats';

export const metadata: Metadata = {
  title: 'Leitura',
  description: 'Leitura de terminal.',
};

interface ClosureProps {
  params: {
    id: string;
  };
}

export default async function Closure({ params: { id } }: ClosureProps) {
  const session = await getServerSession(authOptions);

  const netDistributions: NetDistributionData[] = [];

  const statValues = {
    cashIn: 0,
    cashOut: 0,
    gross: 0,
    net: 0,
  };

  const renderDescription = (
    <div className='flex flex-col gap-1 md:flex-row md:gap-4'>
      <div className='flex gap-1 items-center'>
        <Laptop size={16} />
        <span>0000</span>
      </div>
      <div className='flex gap-1 items-center'>
        <User size={16} />
        <span>John</span>
      </div>
      <div className='flex gap-1 items-center'>
        <Calendar size={16} />
        <span>{getDateFormatted(new Date())}</span>
      </div>
    </div>
  );

  return (
    <ClosureProvider initialData={{ }}>
      <PageContainer
        title={`Fechamento`}
        description={renderDescription}
        goBackUrl={'/closure'}
      >
        <ClosureStats statValues={statValues} />
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card className='col-span-2'>
            <CardHeader>
              <CardTitle>Gráfico de Distribuição</CardTitle>
              <CardDescription>
                Passe o mouse sobre o gráfico para ver os dados.
              </CardDescription>
            </CardHeader>
            <CardContent className='pl-2'>
              <ChartDistribution netDistributions={netDistributions} />
            </CardContent>
          </Card>
          <Card className='col-span-2'>
            <CardHeader>
              <CardTitle>Distribuição de Ganhos</CardTitle>
              <CardDescription>
                Ganhos divididos em {netDistributions.length} parte(s).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ListDistribution netDistributions={netDistributions} />
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </ClosureProvider>
  );
}
