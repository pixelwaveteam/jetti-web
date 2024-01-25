'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { createCashFlow } from '@/app/(in)/cash-flows/actions/create-cash-flow';
import { fetchLastCashFlow } from '@/app/(in)/cash-flows/actions/fetch-last-cash-flow';
import { CardPeriodCashFlow } from '@/app/(in)/cash-flows/card-period';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { CashFlowContext } from '@/providers/cash-flow-provider';
import { SheetContext } from '@/providers/sheet-provider';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

const CashFlowFormCreateSchema = z.object({
  terminalId: z.string({ required_error: 'Terminal é obrigatório.' }),
  establishmentId: z.string({ required_error: 'Local é obrigatório.' }),
  cashIn: z.coerce.number().transform((val) => {
    const cashInCents = val * 100;

    return cashInCents;
  }),
  cashOut: z.coerce.number().transform((val) => {
    const cashOutCents = val * 100;

    return cashOutCents;
  }),
  date: z.date({ required_error: 'Data é obrigatória.' }),
});

type CashFlowFormCreateType = z.infer<typeof CashFlowFormCreateSchema>;

export function CashFlowFormCreate() {
  const router = useRouter();
  const { terminals, setPeriod, establishments } = useContext(CashFlowContext);
  const { setShow } = useContext(SheetContext);
  const { toast } = useToast();
  const { data: session } = useSession();

  const role = session ? session?.user.role : undefined;

  const formMethods = useForm<CashFlowFormCreateType>({
    resolver: zodResolver(CashFlowFormCreateSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const { control, handleSubmit, watch } = formMethods;

  const terminalId = watch('terminalId');
  const establishmentId = watch('establishmentId');

  const onSubmit = async ({
    date,
    establishmentId,
    ...data
  }: CashFlowFormCreateType) => {
    try {
      const cashFlowCreated = await createCashFlow({
        ...data,
        date: date.toISOString(),
      });

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Local criado com sucesso.',
        duration: 5000,
      });

      router.push(`/cash-flows/${cashFlowCreated.id}`);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Favor tente novamente mais tarde.',
        duration: 5000,
      });
    }
  };

  useEffect(() => {
    async function handlePeriodCashFlow(terminalId: string) {
      try {
        const result = await fetchLastCashFlow(terminalId);

        setPeriod(result.date);
      } catch {
        setPeriod(null);
      }
    }

    if (terminalId) {
      handlePeriodCashFlow(terminalId);
    }
  }, [setPeriod, terminalId]);

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
        <FormField
          control={control}
          name='establishmentId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Local</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione...' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {establishments.map((establishment) => (
                    <SelectItem key={establishment.id} value={establishment.id}>
                      {establishment.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='terminalId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Terminal</FormLabel>
              <Select
                disabled={!establishmentId}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione...' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {terminals
                    .filter(
                      (terminal) => terminal.establishmentId === establishmentId
                    )
                    .map((terminal) => (
                      <SelectItem key={terminal.id} value={terminal.id}>
                        {terminal.code} - {terminal.interfaceName}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='cashIn'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entradas</FormLabel>
              <FormControl>
                <Input placeholder='Total de Entradas' {...field} />
              </FormControl>
              <FormDescription>
                Entradas no terminal no período.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='cashOut'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Saídas</FormLabel>
              <FormControl>
                <Input placeholder='Total de Saídas' {...field} />
              </FormControl>
              <FormDescription>Saídas no terminal no período.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='date'
          render={({ field }) => (
            <Popover key={field.name}>
              <PopoverTrigger asChild>
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <Input
                    placeholder='--/--/----'
                    value={field.value ? format(field.value, 'dd/MM/yyyy') : ''}
                    className='max-w-xs'
                  />
                  <FormMessage />
                </FormItem>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  locale={ptBR}
                  mode='single'
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={role === 'OPERATOR'}
                />
              </PopoverContent>
            </Popover>
          )}
        />

        <CardPeriodCashFlow show={!!terminalId} />
        <Button type='submit' className='w-full'>
          Criar
        </Button>
      </form>
    </Form>
  );
}
