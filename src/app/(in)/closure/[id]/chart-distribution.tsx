'use client';

import { useMemo } from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { ClosureDistribution } from '../actions/fetch-closure-distribution';

interface ChartDistributionProps {
  netDistributions: ClosureDistribution[];
}

function calculatePercentage(amount: number, total: number) {
  return (amount*100)/total
}

export function ChartDistribution({
  netDistributions,
}: ChartDistributionProps) {
  const totalAmount = useMemo(() => netDistributions.reduce(
    (acc, netDistribution) => acc + netDistribution.amount,
    0
  ), [netDistributions])

  const distributions = useMemo(() => {
    return netDistributions.map((distribution) => {
      return {
        name: distribution.name,
        percetage: calculatePercentage(distribution.amount, totalAmount),
      };
    });
  }, [netDistributions, totalAmount]);

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
