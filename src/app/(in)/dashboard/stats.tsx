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

  const filteredCashFlows = useMemo(() => 
    cashFlows.filter(cashFlow => 
      !!cashFlow.organizationId && filter.organization ? cashFlow.organizationId == filter.organization : true
    ), [cashFlows, filter.organization]
  )

  const filteredTerminal = useMemo(() => 
    terminals.filter(terminal => 
      !!terminal.organizationId && filter.organization ? terminal.organizationId == filter.organization : true
    ), [terminals, filter.organization]
  )

  const filteredEstablishments = useMemo(() => 
    establishments.filter(establishment => 
      !!establishment.organizationId && filter.organization ? establishment.organizationId == filter.organization : true
    ), [establishments, filter.organization]
  )

  const warehouses = useMemo(() => {
    return filteredEstablishments.filter((establishment) => establishment.isWarehouse);
  }, [filteredEstablishments]);

  const totalTerminalsWarehouse = useMemo(() => {
    return (
      filteredTerminal.filter((terminal) =>
        warehouses.some(
          (warehouse) => warehouse.id === terminal.establishmentId
        )
      ).length || 0
    );
  }, [filteredTerminal, warehouses]);

  const totalTerminals = useMemo(() => {
    return filteredTerminal.length - totalTerminalsWarehouse || 0;
  }, [filteredTerminal, totalTerminalsWarehouse]);

  const totalEstablishments = useMemo(() => {
    return (
      filteredEstablishments.filter((establishment) => 
      establishment.isActive && 
      !establishment.isWarehouse).length || 0
    );
  }, [filteredEstablishments]);

  const totalEarnings = useMemo(() => {
    return filteredCashFlows
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
  }, [filteredCashFlows, filter.endDate, filter.startDate]);

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
