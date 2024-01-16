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

import Link from 'next/link';
import { ChartAnnualEarnings } from './chart-annual-earnings';
import { OverviewFilter } from './filter';
import { RecentCashFlows } from './recent-cash-flows';
import { OverviewStats } from './stats';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Resumo das informações importantes da aplicação.',
};

export default async function Dashboard() {
  const [cashFlows, terminals, establishments] = await Promise.all([
    fetchCashFlows(),
    fetchTerminals(),
    fetchEstablishments(),
  ]);

  return (
    <DashboardProvider initialData={{ cashFlows, terminals, establishments }}>
      <PageContainer title='Dashboard' action={<OverviewFilter />}>
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
