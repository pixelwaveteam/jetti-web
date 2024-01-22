'use client';

import { Building, DollarSign, Gamepad, Laptop } from 'lucide-react';
import { useContext } from 'react';

import { CardStat } from '@/components/card-stat';
import { DashboardContext } from '@/providers/dashboard-provider';
import { convertCentsToCurrency } from '@/utils/currency';
import { isWithinInterval, startOfDay } from 'date-fns';

export function OverviewStats() {
  const { filter, cashFlows, terminals, establishments } =
    useContext(DashboardContext);

  const totalTerminals = terminals.length || 0;
  const totalEstablishments = establishments.length || 0;

  const totalCashFlows =
    cashFlows.filter((cashFlow) => {
      const cashFlowDate = new Date(cashFlow.date);

      const isBetween = isWithinInterval(startOfDay(cashFlowDate), {
        start: startOfDay(filter.startDate),
        end: startOfDay(filter.endDate),
      });

      return isBetween;
    }).length || 0;

  const totalEarnings = cashFlows
    .filter((cashFlow) => {
      const cashFlowDate = new Date(cashFlow.date);

      const isBetween = isWithinInterval(startOfDay(cashFlowDate), {
        start: startOfDay(filter.startDate),
        end: startOfDay(filter.endDate),
      });

      return isBetween;
    })
    .reduce((acc, cashFlow) => {
      acc += cashFlow.net;

      return acc;
    }, 0);

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <CardStat
        title='Ganhos'
        highlight={convertCentsToCurrency(totalEarnings)}
        description='Total de ganhos no período'
        icon={DollarSign}
      />

      <CardStat
        title='Leituras'
        highlight={totalCashFlows.toString()}
        description='Total de leituras no período'
        icon={Gamepad}
      />

      <CardStat
        title='Terminais'
        highlight={totalTerminals.toString()}
        description='Total de terminais ativos'
        icon={Laptop}
      />

      <CardStat
        title='Locais'
        highlight={totalEstablishments.toString()}
        description='Total de locais cadastrados'
        icon={Building}
      />
    </div>
  );
}
