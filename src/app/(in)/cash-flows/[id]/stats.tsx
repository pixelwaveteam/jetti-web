import { DollarSign, LucideIcon } from 'lucide-react';

import { CardStat } from '@/components/card-stat';
import { convertCentsToCurrency } from '@/utils/currency';

interface CashFlowStatsProps {
  statValues: {
    cashIn: number;
    cashOut: number;
    net: number;
  };
}

type CashFlowStat = {
  id: string;
  title: string;
  icon: LucideIcon;
  iconColor: 'text-yellow-400' | 'text-red-400' | 'text-green-400';
};

const cashFlowStats = [
  {
    id: 'cashIn',
    title: 'Entradas',
    icon: DollarSign,
    iconColor: 'text-yellow-400',
  },
  {
    id: 'cashOut',
    title: 'Saídas',
    icon: DollarSign,
    iconColor: 'text-red-400',
  },
  {
    id: 'net',
    title: 'Ganhos',
    icon: DollarSign,
    iconColor: 'text-green-400',
  },
] satisfies CashFlowStat[];

export function CashFlowStats({ statValues }: CashFlowStatsProps) {
  return (
    <div className='grid gap-4 grid-cols-1 md:grid-cols-3'>
      {cashFlowStats.map((stat) => {
        const statKey = stat.id as keyof typeof statValues;

        const highlight = statValues[statKey];

        return (
          <CardStat
            key={stat.id}
            title={stat.title}
            highlight={convertCentsToCurrency(highlight)}
            icon={stat.icon}
            iconColor={stat.iconColor}
          />
        );
      })}
    </div>
  );
}
