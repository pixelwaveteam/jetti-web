import { Metadata } from 'next';

import { ChartAnnualEarnings } from '@/app/(in)/dashboard/chart-annual-earnings';
import { OverviewFilter } from '@/app/(in)/dashboard/filter';
import { RecentCashFlows } from '@/app/(in)/dashboard/recent-cash-flows';
import { OverviewStats } from '@/app/(in)/dashboard/stats';
import { PageContainer } from '@/components/page-container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getYear } from 'date-fns';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Resumo das informações importantes da aplicação.',
};

export default async function Dashboard() {
  return (
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
        <Card className='col-span-2'>
          <CardHeader>
            <CardTitle>Leituras recentes</CardTitle>
            <CardDescription>Você fez 6 leituras esse mês.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentCashFlows />
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
