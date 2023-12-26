'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CashFlowContext } from '@/providers/cash-flow-provider';
import { Calendar } from 'lucide-react';
import { useContext } from 'react';

interface CardPeriodCashFlowProps {
  show: boolean;
}

export function CardPeriodCashFlow({ show }: CardPeriodCashFlowProps) {
  const { period } = useContext(CashFlowContext);

  if (!show) {
    return null;
  }

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

  return (
    <Alert>
      <Calendar className='h-4 w-4' />
      <AlertTitle>Período</AlertTitle>
      <AlertDescription>
        {period.startDate.toLocaleDateString()} -{' '}
        {period.endDate.toLocaleDateString()}
      </AlertDescription>
      <AlertDescription className='text-xs text-gray-300'>
        Última leitura - {period.startDate.toLocaleDateString()}
      </AlertDescription>
    </Alert>
  );
}
