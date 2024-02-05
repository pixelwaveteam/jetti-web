import { DollarSign, FileArchive, LucideIcon } from 'lucide-react';

import { CardStat } from '@/components/card-stat';
import { convertCentsToCurrency } from '@/utils/currency';

interface ClosureStatsProps {
  statValues: {
    cashFlowsTotal: number;
    gross: number;
    net: number;
  };
}

type ClosureStat = {
  id: string;
  title: string;
  icon: LucideIcon;
  iconColor:
    | 'text-blue-400'
    | 'text-green-400'
    | 'text-green-600';
  currency?: boolean;
};

const closureStats = [
  {
    id: 'cashFlowsTotal',
    title: 'Total de Leituras',
    icon: FileArchive,
    iconColor: 'text-blue-400',
    currency: false,
  },
  {
    id: 'gross',
    title: 'Ganhos bruto',
    icon: DollarSign,
    iconColor: 'text-green-400',
    currency: true,
  },
  {
    id: 'net',
    title: 'Ganhos líquido',
    icon: DollarSign,
    iconColor: 'text-green-600',
    currency: true,
  },
] satisfies ClosureStat[];

export function ClosureStats({ statValues }: ClosureStatsProps) {
  return (
    <div className='grid gap-4 grid-cols-2 md:grid-cols-3'>
      {closureStats.map((stat) => {
        const statKey = stat.id as keyof typeof statValues;

        const highlight = stat.currency === false ? 
          String(statValues[statKey]) : 
          convertCentsToCurrency(statValues[statKey]);

        return (
          <CardStat
            key={stat.id}
            title={stat.title}
            highlight={highlight}
            icon={stat.icon}
            iconColor={stat.iconColor}
          />
        );
      })}
    </div>
  );
}
