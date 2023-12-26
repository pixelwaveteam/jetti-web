'use client';

import { useContext } from 'react';

import { DashboardContext } from '@/providers/dashboard-provider';
import { getDateFormatted } from '@/utils/date';

export function RecentCashFlows() {
  const { cashFlows } = useContext(DashboardContext);

  const lastCashFlows = cashFlows.slice(0, 6);

  return (
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
            {getDateFormatted(cashFlow.createdAt)}
          </div>
        </div>
      ))}
    </div>
  );
}
