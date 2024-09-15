'use client';

import { NetDistributionData } from '@/app/(in)/cash-flows/actions/fetch-net-distributions';
import { useMemo } from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

interface ChartDistributionProps {
  netDistributions: NetDistributionData[];
}

export function ChartDistribution({
  netDistributions,
}: ChartDistributionProps) {
  const distributions = useMemo(() => {
    return netDistributions.map((distribution) => {
      return {
        name: distribution.name,
        percetage: distribution.percentage / 100,
      };
    });
  }, [netDistributions]);

  return (
    <ResponsiveContainer width='100%' height={350}>
      <PieChart>
        <Pie
          dataKey='percetage'
          data={distributions}
          innerRadius={70}
          outerRadius={140}
          fill='#818CF8'
        />
        <Tooltip
          cursor={{ fill: 'transparent' }}
          formatter={(value, label) => [`${label}: ${value}%`]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
