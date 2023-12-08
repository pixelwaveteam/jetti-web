import { Metadata } from 'next';

import { OverviewStats } from '@/app/(in)/dashboard/stats';

import { OverviewChart } from '@/app/(in)/dashboard/chart';
import { OverviewFilter } from '@/app/(in)/dashboard/filter';
import { RecentCashFlows } from '@/app/(in)/dashboard/recent-cash-flows';
import { PageContainer } from '@/components/page-container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
            <CardTitle>Ganhos últimos meses</CardTitle>
          </CardHeader>
          <CardContent className='pl-2'>
            <OverviewChart />
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
