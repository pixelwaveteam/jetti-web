'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { deleteCashFlow } from '@/app/(in)/cash-flows/actions/delete-cash-flow';
import { updateCashFlow } from '@/app/(in)/cash-flows/actions/update-cash-flow';
import { CashFlow } from '@/app/(in)/cash-flows/columns';
import { ConfirmDeletionDialog } from '@/components/confirm-deletion-dialog';
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
import { useRouter } from 'next/navigation';

const CashFlowFormEditSchema = z.object({
  terminalId: z.string(),
  cashIn: z.coerce.number().transform((val) => {
    const cashInCents = val * 100;

    return cashInCents;
  }),
  cashOut: z.coerce.number().transform((val) => {
    const cashOutCents = val * 100;

    return cashOutCents;
  }),
});

type CashFlowFormEditType = z.infer<typeof CashFlowFormEditSchema>;

interface CashFlowFormEditProps {
  cashFlow: CashFlow;
}

export function CashFlowFormEdit({ cashFlow }: CashFlowFormEditProps) {
  const { terminals } = useContext(CashFlowContext);
  const { toast } = useToast();
  const { setShow } = useContext(SheetContext);
  const router = useRouter();

  const formMethods = useForm<CashFlowFormEditType>({
    resolver: zodResolver(CashFlowFormEditSchema),
    defaultValues: {
      terminalId: cashFlow.terminalId,
      cashIn: cashFlow.cashIn / 100,
      cashOut: cashFlow.cashOut / 100,
    },
  });

  const { handleSubmit, control } = formMethods;

  const onSubmit = async (data: CashFlowFormEditType) => {
    try {
      await updateCashFlow({
        id: cashFlow.id,
        data,
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
        description: 'Leitura excluida com sucesso.',
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
            name='terminalId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Terminal</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecione...' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {terminals.map((terminal) => (
                      <SelectItem key={terminal.id} value={terminal.id}>
                        {terminal.code}
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
                <FormLabel>Entradas R$</FormLabel>
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
                <FormLabel>Saídas R$</FormLabel>
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
