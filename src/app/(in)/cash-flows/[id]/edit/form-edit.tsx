'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { deleteCashFlow } from '@/app/(in)/cash-flows/actions/delete-cash-flow';
import { updateCashFlow } from '@/app/(in)/cash-flows/actions/update-cash-flow';
import { ConfirmDeletionDialog } from '@/components/confirm-deletion-dialog';
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
import { DialogProvider } from '@/providers/dialog-provider';
import { SheetContext } from '@/providers/sheet-provider';

import { CashFlow } from '../../actions/fetch-cash-flow';

const CashFlowFormEditSchema = z.object({
  terminalId: z.string({ required_error: 'Terminal é obrigatório.' }),
  establishmentId: z.string({ required_error: 'Local é obrigatório.' }),
  input: z.coerce.number({ required_error: 'Entrada é obrigatório.' }),
  output: z.coerce.number({ required_error: 'Saída é obrigatório.' }),
  date: z.date({ required_error: 'Data é obrigatória.' }),
});

type CashFlowFormEditType = z.infer<typeof CashFlowFormEditSchema>;

interface CashFlowFormEditProps {
  cashFlow: CashFlow & {
    establishmentId: string;
  };
}

export function CashFlowFormEdit({ cashFlow }: CashFlowFormEditProps) {
  const { initialData } = useContext(CashFlowContext);
  const { toast } = useToast();
  const { setShow } = useContext(SheetContext);
  const router = useRouter();

  const formMethods = useForm<CashFlowFormEditType>({
    resolver: zodResolver(CashFlowFormEditSchema),
    defaultValues: {
      terminalId: cashFlow.terminalId,
      establishmentId: cashFlow.establishmentId,
      input: cashFlow.input,
      output: cashFlow.output,
      date: new Date(cashFlow.date),
    },
  });

  const { handleSubmit, control, watch } = formMethods;

  const establishmentId = watch('establishmentId');

  const onSubmit = async ({
    date,
    establishmentId,
    ...data
  }: CashFlowFormEditType) => {
    try {
      await updateCashFlow({
        id: cashFlow.id,
        data: {
          ...data,
          date: date.toISOString(),
        },
      });

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Leitura alterada com sucesso.',
        duration: 5000,
      });
    } catch {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Favor tente novamente mais tarde.',
        duration: 5000,
      });
    }
  };

  const handleDeleteCashFlow = async () => {
    try {
      await deleteCashFlow(cashFlow.id);

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Leitura excluída com sucesso.',
        duration: 5000,
      });

      router.push(`/cash-flows`);
    } catch {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Favor tente novamente mais tarde.',
        duration: 5000,
      });
    }
  };

  return (
    <div className='space-y-6'>
      <Form {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
          <FormField
            control={control}
            name='establishmentId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Local</FormLabel>
                <Select
                  disabled
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecione...' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {initialData.establishments.map((establishment) => (
                      <SelectItem
                        key={establishment.id}
                        value={establishment.id}
                      >
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
                  disabled
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecione...' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {initialData.terminals
                      .filter(
                        (terminal) =>
                          terminal.establishmentId === establishmentId
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
            name='input'
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
            name='output'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Saídas</FormLabel>
                <FormControl>
                  <Input placeholder='Total de Saídas' {...field} />
                </FormControl>
                <FormDescription>
                  Saídas no terminal no período.
                </FormDescription>
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

          <div className='flex gap-2'>
            <Button type='submit' className='w-full'>
              Alterar
            </Button>
            <DialogProvider>
              <ConfirmDeletionDialog onConfirm={handleDeleteCashFlow}>
                <Button type='button' variant='destructive' className='w-full'>
                  Excluir
                </Button>
              </ConfirmDeletionDialog>
            </DialogProvider>
          </div>
        </form>
      </Form>
    </div>
  );
}
