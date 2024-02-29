'use client';

import { useContext, useMemo } from 'react';

import { CardDescription } from '@/components/ui/card';
import { DashboardContext } from '@/providers/dashboard-provider';
import { getDateFormatted } from '@/utils/date';

export function RecentCashFlows() {
  const { cashFlows, filter } = useContext(DashboardContext);

  const filteredCashFlows = useMemo(() => 
    cashFlows.filter(cashFlow => 
      !!cashFlow.organizationId && filter.organization ? cashFlow.organizationId == filter.organization : true
    ), [cashFlows, filter.organization]
  )

  const lastCashFlows = filteredCashFlows.slice(0, 6);

  return (
    <>
      {
        filteredCashFlows.length > 0 ?
          <div className='space-y-8'>
            {lastCashFlows.map((cashFlow) => (
              <div className='flex items-center' key={cashFlow.id}>
                <div className='space-y-1'>
                  <p className='text-sm font-medium leading-none'>
                    {cashFlow.terminal}
                  </p>
                  <p className='text-sm text-muted-foreground'>{cashFlow.operator}</p>
                </div>
                <div className='ml-auto font-medium'>
                  {getDateFormatted(cashFlow.date)}
                </div>
              </div>
            ))}
          </div>
        :
          <div className='h-full w-full flex items-center justify-center'>
            <CardDescription>Nenhuma leitura recente!</CardDescription>
          </div>
      }
    </>
  );
}
