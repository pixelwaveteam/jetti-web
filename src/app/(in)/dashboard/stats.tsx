import { Building, DollarSign, Gamepad, Laptop } from 'lucide-react';

import { CardStat } from '@/components/card-stat';

export function OverviewStats() {
  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <CardStat
        title='Ganhos'
        highlight='R$ 45.231,89'
        description='Total de saídas R$ 2.542,30'
        icon={DollarSign}
      />

      <CardStat
        title='Leituras'
        highlight='50'
        description='Faltam 10 leituras'
        icon={Gamepad}
      />

      <CardStat
        title='Terminais'
        highlight='60'
        description='5 terminais inativos'
        icon={Laptop}
      />

      <CardStat
        title='Locais'
        highlight='26'
        description='+2 que mês anterior'
        icon={Building}
      />
    </div>
  );
}
