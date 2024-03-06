import { getYear } from 'date-fns';
import { Metadata } from 'next';

import { fetchCashFlows } from '@/app/(in)/cash-flows/actions/fetch-cash-flows';
import { fetchEstablishments } from '@/app/(in)/establishments/actions/fetch-establishments';
import { fetchTerminals } from '@/app/(in)/terminals/actions/fetch-terminals';
import { PageContainer } from '@/components/page-container';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DashboardProvider } from '@/providers/dashboard-provider';

import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { fetchOrganizations } from '../organizations/actions/fetch-organizations';
import { ChartAnnualEarnings } from './chart-annual-earnings';
import { OverviewFilter } from './filter';
import { RecentCashFlows } from './recent-cash-flows';
import { OverviewStats } from './stats';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Resumo das informações importantes da aplicação.',
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  const [rawCashFlows, rawTerminals, rawEstablishments, rawOrganizations] = await Promise.all([
    fetchCashFlows(),
    fetchTerminals(),
    fetchEstablishments(),
    fetchOrganizations()
  ]);

  const establishments = rawEstablishments.filter(({ organizationId }) => session?.user.organizationsId.includes(organizationId))

  const cashFlows = [];

  for(const cashFlow of rawCashFlows) {
    const cashFlowTerminal = rawTerminals.find(({ code }) => String(code) === cashFlow.terminal)
    const cashFlowEstablishment = cashFlowTerminal && establishments.find(({ id }) => id === cashFlowTerminal.establishmentId)

    if(cashFlowEstablishment) {
      if(!session?.user.organizationsId.includes(cashFlowEstablishment.organizationId)) {
        continue
      }

      cashFlows.push({...cashFlow, organizationId: cashFlowEstablishment.organizationId})
    }
  }

  const terminals = [];

  for(const terminal of rawTerminals) {
    const terminalEstablishment = establishments.find(({ id }) => id === terminal.establishmentId)

    if(terminalEstablishment) {
      if(!session?.user.organizationsId.includes(terminalEstablishment.organizationId)) {
        continue
      }

      terminals.push({...terminal, organizationId: terminalEstablishment.organizationId})
    }
  }

  const organizations = rawOrganizations.filter(({ id }) => session?.user.organizationsId.includes(id))

  return (
    <DashboardProvider initialData={{ cashFlows, terminals, establishments }}>
      <PageContainer title='Dashboard' action={<OverviewFilter organizations={organizations} />}>
        <OverviewStats />
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          <Card className='col-span-2'>
            <CardHeader>
              <CardTitle>Ganhos em {getYear(new Date())}</CardTitle>
            </CardHeader>
            <CardContent className='pl-2'>
              <ChartAnnualEarnings />
            </CardContent>
          </Card>
          <Card className='col-span-2 flex flex-col'>
            <CardHeader>
              <div className='flex items-center justify-between'>
                <div className='space-y-2'>
                  <CardTitle>Leituras recentes</CardTitle>
                  <CardDescription>
                    Lista das últimas leituras realizadas.
                  </CardDescription>
                </div>
                {
                  cashFlows.length > 0 &&
                    <Link href='/cash-flows'>
                      <Button variant='outline'>Ver todas</Button>
                    </Link>
                }
              </div>
            </CardHeader>
            <CardContent className='flex-1'>
              <RecentCashFlows />
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </DashboardProvider>
  );
}
