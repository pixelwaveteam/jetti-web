import { Calendar, DollarSign, User } from 'lucide-react';
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
import { fetchUser } from '../../users/actions/fetch-user';
import { fetchClosure } from '../actions/fetch-closure';
import { fetchClosureCashFlows } from '../actions/fetch-closure-cash-flows';
import { fetchClosureDistributions } from '../actions/fetch-closure-distribution';
import { ChartDistribution } from './chart-distribution';
import { DeleteClosureDialog } from './delete-closure-dialog';
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

  const {  net, gross, closerId, createdAt  } = await fetchClosure(id);

  const closureDistribution = await fetchClosureDistributions(id);

  const closer = await fetchUser(closerId);

  const cashFlows = await fetchClosureCashFlows(id);

  const cashFlowsTotal = cashFlows.length

  const renderDeleteClosureButton = (
    <DeleteClosureDialog />
  )

  const statValues = {
    cashFlowsTotal,
    gross,
    net,
  };

  const renderDescription = (
    <div className='flex flex-col gap-1 md:flex-row md:gap-4'>
      <div className='flex gap-1 items-center'>
        <DollarSign size={16} />
        <span>{id}</span>
      </div>
      <div className='flex gap-1 items-center'>
        <User size={16} />
        <span>{closer.name}</span>
      </div>
      <div className='flex gap-1 items-center'>
        <Calendar size={16} />
        <span>{getDateFormatted(createdAt)}</span>
      </div>
    </div>
  );

  return (
    <ClosureProvider initialData={{ }}>
      <PageContainer
        title={`Fechamento`}
        description={renderDescription}
        goBackUrl={'/closure'}
        action={renderDeleteClosureButton}
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
              <ChartDistribution netDistributions={closureDistribution} />
            </CardContent>
          </Card>
          <Card className='col-span-2'>
            <CardHeader>
              <CardTitle>Distribuição de Ganhos</CardTitle>
              <CardDescription>
                Ganhos divididos em {closureDistribution.length} parte(s).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ListDistribution netDistributions={closureDistribution} />
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </ClosureProvider>
  );
}
