import { Metadata } from 'next';

import { OverviewStats } from '@/app/(in)/overview/stats';

import { OverviewChart } from '@/app/(in)/overview/chart';
import { OverviewFilter } from '@/app/(in)/overview/filter';
import { RecentCashFlows } from '@/app/(in)/overview/recent-cash-flows';
import { PageContainer } from '@/components/page-container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Overview',
  description: 'Overview of data and important informations.',
};

export default async function Overview() {
  return (
    <PageContainer title='Overview' action={<OverviewFilter />}>
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
