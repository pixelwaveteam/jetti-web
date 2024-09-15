'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef
} from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { createCashFlow } from '@/app/(in)/cash-flows/actions/create-cash-flow';
import { fetchLastCashFlow } from '@/app/(in)/cash-flows/actions/fetch-last-cash-flow';
import { CardPeriodCashFlow } from '@/app/(in)/cash-flows/card-period';
import { Button } from '@/components/ui/button';
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
import { Progress } from '@/components/ui/progress';
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
import { revalidateTerminals } from '../../terminals/actions/revalidate-terminal';

const CashFlowFormCreateSchema = () =>
  z.object({
    terminalId: z.string({ required_error: 'Terminal é obrigatório.' }),
    input: z.coerce
      .number({
        required_error: 'Entrada é obrigatório.',
        invalid_type_error: 'Entrada deve ser um número. Substitua "," por "."',
      })
      .transform((value) => value * 100),
    output: z.coerce
      .number({
        required_error: 'Saída é obrigatório.',
        invalid_type_error: 'Saída deve ser um número. Substitua "," por "."',
      })
      .transform((value) => value * 100),
  });

const CashFlowFormCreateSchemaDefault = CashFlowFormCreateSchema();

type CashFlowFormCreateType = z.infer<typeof CashFlowFormCreateSchemaDefault>;

export function CashFlowFormCreate() {
  const { terminals, setPeriod, selectedEstablishment, selectEstablishment } =
    useContext(CashFlowContext);
  const { setShow } = useContext(SheetContext);
  const { toast } = useToast();

  const completedTerminals = useRef<string[]>([]);

  const availableTerminals = useMemo(() => {
    return terminals.filter(
      (terminal) => !completedTerminals.current.includes(terminal.id)
    );
  }, [terminals]);

  const terminalReaderProgress = useMemo(() => {
    const totalTerminals = terminals.length;
    const completed = completedTerminals.current.length;

    return (completed / totalTerminals) * 100;
  }, [terminals, completedTerminals]);

  const formMethods = useForm<CashFlowFormCreateType>({
    resolver: zodResolver(
      CashFlowFormCreateSchema()
    ),
    defaultValues: {
      terminalId:
        availableTerminals.length > 0 ? availableTerminals[0].id : undefined,
      input: '' as unknown as number,
      output: '' as unknown as number,
    },
  });

  const { control, handleSubmit, watch, setValue, reset, setError, clearErrors } = formMethods;

  const terminalId = watch('terminalId');

  const input = watch('input');
  
  const output = watch('output');

  const onSubmit = async (data: CashFlowFormCreateType) => {
    try {
      await createCashFlow(data);

      await revalidateTerminals();

      completedTerminals.current.push(data.terminalId);

      setValue('output', '' as unknown as number);
      setValue('input', '' as unknown as number);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Leitura criada com sucesso.',
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
    selectEstablishment(null);
  }, [reset, selectEstablishment, setShow]);

  const lastInput = useMemo(() => {
    return terminals.find((terminal) => terminal.id === terminalId)?.input || 0;
  }, [terminals, terminalId]);

  
  const lastOutput = useMemo(() => {
    return (
      terminals.find((terminal) => terminal.id === terminalId)?.output || 0
    );
  }, [terminals, terminalId]);

  useEffect(() => {
    if (input && input < lastInput) {
      setError('input', {
        message: 'O valor de entrada deve ser maior ou igual anterior',
        type: 'min',
      })
    }

    if(Number(input)*100 >= lastInput) {
      clearErrors('input')
    }
  }, [input, lastInput, setError, clearErrors]);

  useEffect(() => {
    console.log({output, lastOutput})

    if (output && Number(output)*100 < lastOutput) {
      setError('output', {
        message: 'O valor de saída deve ser maior ou igual anterior',
        type: 'min',
      })

      return;
    }

    if(Number(output)*100 >= lastOutput) {
      clearErrors('output')
    }
  }, [output, lastOutput, setError, clearErrors]);

  useEffect(() => {
    async function handlePeriodCashFlow(selectedTerminalId: string) {
      try {
        const lastCashFlow = await fetchLastCashFlow(selectedTerminalId);

        setPeriod(lastCashFlow?.date || null);
      } catch {
        setPeriod(null);
      }
    }

    if (terminalId) {
      handlePeriodCashFlow(terminalId);
    }
  }, [setPeriod, terminalId]);

  useEffect(() => {
    if (availableTerminals.length === 0) {
      onClose();
    }
  }, [availableTerminals, onClose]);

  useEffect(() => {
    if (availableTerminals.length > 0) {
      setValue('terminalId', availableTerminals[0].id);
    }
  }, [availableTerminals, setValue]);

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
        <div className='flex flex-col gap-2'>
          <span className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
            Local
            <Button
              variant={'secondary'}
              size={'xs'}
              className='ml-2'
              onClick={() => selectEstablishment(null)}
            >
              Alterar
            </Button>
          </span>
          <strong className='font-bold leading-none text-muted-foreground'>
            {selectedEstablishment?.name}
          </strong>
        </div>

        <div className='flex items-center'>
          <Progress value={terminalReaderProgress} />
          <span className='ml-2 text-sm text-gray-300'>
            {`${completedTerminals.current.length}/${terminals.length}`}
          </span>
        </div>

        <FormField
          control={control}
          name='terminalId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Terminal</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione...'>
                      {
                        availableTerminals.find(
                          (terminal) => terminal.id === field.value
                        )?.code
                      }{' '}
                      -{' '}
                      {
                        availableTerminals.find(
                          (terminal) => terminal.id === field.value
                        )?.interfaceName
                      }
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableTerminals.map((terminal) => (
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
          name='input'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entradas</FormLabel>
              <FormControl>
                <Input placeholder='Total de Entradas' {...field} />
              </FormControl>
              <FormDescription>
                {lastInput > 0
                  ? `Entrada atual: ${lastInput/100}`
                  : `Nenhuma entrada anterior registrada`}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name='output'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Saídas</FormLabel>
              <FormControl>
                <Input placeholder='Total de Saídas' {...field} />
              </FormControl>
              <FormDescription>
                {lastOutput > 0
                  ? `Saída atual: ${lastOutput/100}`
                  : `Nenhuma saída anterior registrada`}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {!!terminalId && <CardPeriodCashFlow />}
        <Button type='submit' className='w-full'>
          Criar
        </Button>
      </form>
    </Form>
  );
}
