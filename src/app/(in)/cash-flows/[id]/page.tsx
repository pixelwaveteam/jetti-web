import { Calendar, Laptop, User } from 'lucide-react';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';

import { fetchCashFlow } from '@/app/(in)/cash-flows/actions/fetch-cash-flow';
import { fetchNetDistributions } from '@/app/(in)/cash-flows/actions/fetch-net-distributions';
import {
  Terminal,
  fetchTerminals,
} from '@/app/(in)/terminals/actions/fetch-terminals';
import { fetchUser } from '@/app/(in)/users/actions/fetch-user';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { PageContainer } from '@/components/page-container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CashFlowProvider } from '@/providers/cash-flow-provider';
import { SheetProvider } from '@/providers/sheet-provider';
import { getDateFormatted } from '@/utils/date';

import { ListDistribution } from '@/app/(in)/cash-flows/[id]/list-distribution';
import { fetchEstablishments } from '../../establishments/actions/fetch-establishments';
import { fetchInterface } from '../../interfaces/actions/fetch-interface';
import { fetchCashFlows } from '../actions/fetch-cash-flows';
import { ChartDistribution } from './chart-distribution';
import { CashFlowEditSheet } from './edit/edit-sheet';
import { CashFlowStats } from './stats';

export const metadata: Metadata = {
  title: 'Leitura',
  description: 'Leitura de terminal.',
};

interface CashFlowProps {
  params: {
    id: string;
  };
}

export default async function CashFlow({ params: { id } }: CashFlowProps) {
  const session = await getServerSession(authOptions);

  const isAdmin = session?.user?.role === 'ADMIN';

  const cashFlow = await fetchCashFlow(id);
  const cashFlows = await fetchCashFlows();
  const establishments = await fetchEstablishments();
  const rawTerminals = await fetchTerminals();
  const operator = await fetchUser(cashFlow.operatorId);
  const netDistributions = await fetchNetDistributions(cashFlow.id);

  const terminal = rawTerminals.find(
    (terminalItem) => terminalItem.id === cashFlow.terminalId
  );

  const terminals = [];

  for (const rawTerminal of rawTerminals) {
    const terminal = rawTerminal as Terminal & {
      interfaceName?: string;
    };

    const fetchedInterface = await fetchInterface(rawTerminal.interfaceId);

    if (fetchedInterface) {
      terminal.interfaceName = fetchedInterface.name;
    }

    terminals.push(terminal);
  }

  const establishment = establishments.find(
    (establishmentItem) => establishmentItem.id === terminal?.establishmentId
  );
  
  const latestCashFlow = cashFlows
    .filter(flow => flow.terminal === String(terminal?.code))
    .sort((a, b) => b.date.localeCompare(a.date))
    .shift();

  const isLatestCashFlow = latestCashFlow?.id === cashFlow.id;

  const renderEditCashFlowButton = (
    <SheetProvider>
      <CashFlowEditSheet
        cashFlow={{ ...cashFlow, establishmentId: establishment?.id || '', isLatestCashFlow }}
      />
    </SheetProvider>
  );

  const statValues = {
    cashIn: cashFlow.cashIn,
    cashOut: cashFlow.cashOut,
    gross: cashFlow.gross,
    net: cashFlow.net,
  };

  const renderDescription = (
    <div className='flex flex-col gap-1 md:flex-row md:gap-4'>
      <div className='flex gap-1 items-center'>
        <Laptop size={16} />
        <span>{terminal?.code}</span>
      </div>
      <div className='flex gap-1 items-center'>
        <User size={16} />
        <span>{operator?.name}</span>
      </div>
      <div className='flex gap-1 items-center'>
        <Calendar size={16} />
        <span>{getDateFormatted(cashFlow.date)}</span>
      </div>
    </div>
  );

  return (
    <CashFlowProvider initialData={{ terminals, establishments }}>
      <PageContainer
        title={`Leitura`}
        description={renderDescription}
        action={isAdmin && renderEditCashFlowButton}
        goBackUrl={'/cash-flows'}
      >
        <CashFlowStats statValues={statValues} />
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
    </CashFlowProvider>
  );
}
