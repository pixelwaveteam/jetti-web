'use client';

import { format, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DashboardContext } from '@/providers/dashboard-provider';
import { cn } from '@/utils/style';

export function OverviewFilter() {
  const { changeFilter } = useContext(DashboardContext);

  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  useEffect(() => {
    if (date?.from && date?.to) {
      changeFilter(date.from, date.to);
    }
  }, [date, changeFilter]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id='date'
          variant={'outline'}
          className={cn(
            'w-[190px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, 'dd/MM/yy', {
                  locale: ptBR,
                })}{' '}
                -{' '}
                {format(date.to, 'dd/MM/yy', {
                  locale: ptBR,
                })}
              </>
            ) : (
              format(date.from, 'dd/MM/yy')
            )
          ) : (
            <span>Selecione data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          initialFocus
          locale={ptBR}
          mode='range'
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
