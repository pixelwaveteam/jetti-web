'use client';

import { isWithinInterval, startOfDay } from 'date-fns';
import { Building, DollarSign, Laptop, Warehouse } from 'lucide-react';
import { useContext, useMemo } from 'react';

import { CardStat } from '@/components/card-stat';
import { DashboardContext } from '@/providers/dashboard-provider';
import { convertCentsToCurrency } from '@/utils/currency';

export function OverviewStats() {
  const { filter, cashFlows, terminals, establishments } =
    useContext(DashboardContext);

  const warehouses = useMemo(() => {
    return establishments.filter((establishment) => establishment.isWarehouse);
  }, [establishments]);

  const totalTerminalsWarehouse = useMemo(() => {
    return (
      terminals.filter((terminal) =>
        warehouses.some(
          (warehouse) => warehouse.id === terminal.establishmentId
        )
      ).length || 0
    );
  }, [terminals, warehouses]);

  const totalTerminals = useMemo(() => {
    return terminals.length - totalTerminalsWarehouse || 0;
  }, [terminals, totalTerminalsWarehouse]);

  const totalEstablishments = useMemo(() => {
    return (
      establishments.filter((establishment) => establishment.isActive).length ||
      0
    );
  }, [establishments]);

  const totalEarnings = useMemo(() => {
    return cashFlows
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
  }, [cashFlows, filter.endDate, filter.startDate]);

  return (
    <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
      <CardStat
        title='Ganhos'
        highlight={convertCentsToCurrency(totalEarnings)}
        description='Total de ganhos no período'
        icon={DollarSign}
      />

      <CardStat
        title='Galpões'
        highlight={totalTerminalsWarehouse.toString()}
        description='Total de terminais nos galpões'
        icon={Warehouse}
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
