'use client';

import { CardDescription } from '@/components/ui/card';
import { DashboardContext } from '@/providers/dashboard-provider';
import { useContext } from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export function ChartAnnualEarnings() {
  const { cashFlows } = useContext(DashboardContext);

  const yearCurrent = new Date().getFullYear();

  const monthNames = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];
  
  const earningsByMonth = monthNames.map((month) => ({
    name: month,
    total: 0,
  }));

  cashFlows.forEach((cashFlow) => {
    const cashFlowDate = new Date(cashFlow.date);

    if (cashFlowDate.getFullYear() === yearCurrent) {
      const month = cashFlowDate.getMonth();
      earningsByMonth[month].total += (cashFlow.net/100);
    }
  });

  return (
    <ResponsiveContainer width='100%' height={350}>
      {
        cashFlows.length > 0 ?
          <BarChart data={earningsByMonth}>
            <XAxis
              dataKey='name'
              stroke='#D1D5DB'
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke='#9CA3AF'
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `R$ ${value}`}
              allowDecimals={true}
            />
            <Bar dataKey='total' fill='#818CF8' radius={[4, 4, 0, 0]} />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              formatter={(value) => [`R$ ${value}`]}
              labelStyle={{ color: '#312E81' }}
              labelFormatter={(label) => `${label}`}
            />
          </BarChart>
        :
          <div className='h-full w-full flex items-center justify-center'>
            <CardDescription>Nenhum ganho registrado este ano</CardDescription>
          </div>
      }
    </ResponsiveContainer>
  );
}
