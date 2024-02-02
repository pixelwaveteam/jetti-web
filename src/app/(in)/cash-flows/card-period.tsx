'use client';

import { Calendar } from 'lucide-react';
import { useContext } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CashFlowContext } from '@/providers/cash-flow-provider';
import { format } from 'date-fns';

export function CardPeriodCashFlow() {
  const { period } = useContext(CashFlowContext);

  if (!period) {
    return (
      <Alert>
        <Calendar className='h-4 w-4' />
        <AlertTitle>Período</AlertTitle>
        <AlertDescription>
          Nenhuma leitura realizada nesse terminal
        </AlertDescription>
      </Alert>
    );
  }

  const startDate = format(period.startDate, 'dd/MM/yyyy');
  const endDate = format(period.endDate, 'dd/MM/yyyy');

  return (
    <Alert>
      <Calendar className='h-4 w-4' />
      <AlertTitle>Período</AlertTitle>
      <AlertDescription>{`${startDate} - ${endDate}`}</AlertDescription>
      <AlertDescription className='text-xs text-gray-300'>
        {`Última leitura - ${startDate}`}
      </AlertDescription>
    </Alert>
  );
}
