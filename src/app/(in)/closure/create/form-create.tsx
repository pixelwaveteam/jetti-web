'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { NewClosureContext } from '@/providers/new-closure-provider';
import { SheetContext, SheetProvider } from '@/providers/sheet-provider';
import { convertCentsToCurrency } from '@/utils/currency';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import { createClosure } from '../actions/create-closure';
import { ConfirmClosureCreationModal } from './confirm-closure-creation-modal';
import { SelectExpensesSheet } from './select-expenses-sheet';

const ClosureFormCreateSchema = () =>
  z.object({
    cashFlows: z.array(z.object({
      code: z.number(),
      id: z.string(),
      gross: z.number(),
    })),
    expenses: z.array(z.object({
      id: z.string(),
      expenseId: z.string(),
      name: z.string(),
      amount: z.number(),
    })),
    date: z.date({ required_error: 'Data é obrigatória.' }),
  });

const ClosureFormCreateSchemaDefault = ClosureFormCreateSchema();

type ClosureFormCreateType = z.infer<typeof ClosureFormCreateSchemaDefault>;

export function ClosureFormCreate() {
  const { closureCashFlows, resetClosureCashFlows } =
    useContext(NewClosureContext);
  
  const { setShow } = useContext(SheetContext);

  const { toast } = useToast();

  const { push } = useRouter()

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const formMethods = useForm<ClosureFormCreateType>({
    resolver: zodResolver(ClosureFormCreateSchema()),
    defaultValues: {
      cashFlows: closureCashFlows,
      expenses: [],
    },
  });

  const { control, handleSubmit, watch, reset } = formMethods;

  const onSubmit = async (data: ClosureFormCreateType) => {
    try {
      const cashFlows = JSON.stringify(data.cashFlows.map(cashFlow => cashFlow.id));
      const expenses = JSON.stringify(data.expenses.map(expense => expense.expenseId));

      const closureCreated = await createClosure({cashFlows, expenses, date: data.date});

      if(closureCreated) {
        push(`/closure/${closureCreated.id}`)
      }

      onClose();

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Fechamento criado com sucesso.',
        duration: 5000,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Favor tente novamente mais tarde.',
        duration: 5000,
      });
    }
  };

  const onClose = useCallback(() => {
    setShow(false);
    reset();
    resetClosureCashFlows()
  }, [reset, resetClosureCashFlows, setShow]);

  const watchedExpenses = watch('expenses')
  const watchedCashFlows = watch('cashFlows')

  const total = useMemo(() => {
    const expensesTotal = watchedExpenses.reduce((acc, expense) => 
      acc + expense.amount
    , 0)

    const cashFlowsTotal = watchedCashFlows.reduce((acc, cashFlow) => 
      acc + cashFlow.gross
    , 0)

    return cashFlowsTotal - expensesTotal
  }, [watchedCashFlows, watchedExpenses])

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4' id='createClosureForm'>
        <FormField
          control={control}
          name='cashFlows'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leituras</FormLabel>
                <ul className='mt-4 flex gap-2 flex-col'>
                  {field.value.map((cashFlow) => (
                    <li key={cashFlow.id}>
                      <Button
                        variant='outline'
                        size='lg'
                        className='w-full'
                        type='button'
                      >
                        {cashFlow.code} - {convertCentsToCurrency(cashFlow.gross)}
                      </Button>
                    </li>
                  ))}
                </ul>
              <FormMessage />
            </FormItem>
          )}
        />
  
        <FormField
          control={control}
          name='expenses'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Despesas</FormLabel>
              <ul className='flex gap-2 flex-col'>
                {field.value.map((expense) => (
                  <li key={expense.id}>
                    <Button
                      variant='outline'
                      size='lg'
                      className='w-full'
                      type='button'
                    >
                      {expense.name} - {convertCentsToCurrency(expense.amount)}
                    </Button>
                  </li>
                ))}
              </ul>
              <SheetProvider>
                <SelectExpensesSheet onChange={field.onChange} selectedExpenses={field.value} />
              </SheetProvider>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='date'
          render={({ field: { value, onChange, ...field } }) => (
            <Popover key={field.name}>
              <PopoverTrigger asChild>
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='--/--/----'
                      value={value ? format(value, 'dd/MM/yyyy') : ''}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </PopoverTrigger>
              <PopoverContent>
                <Calendar
                  locale={ptBR}
                  mode='single'
                  selected={value}
                  onSelect={onChange}
                />
              </PopoverContent>
            </Popover>
          )}
        />

        <strong className='text-right w-full block'>Total: {convertCentsToCurrency(total)}</strong>

        <Button type='button' className='w-full' onClick={() => setShowConfirmationModal(true)}>
          Criar
        </Button>

        <ConfirmClosureCreationModal isOpen={showConfirmationModal} setIsOpen={setShowConfirmationModal} />
      </form>
    </Form>
  );
}
