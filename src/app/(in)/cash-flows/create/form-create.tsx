'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import { Calendar } from 'lucide-react';

const CashFlowFormCreateSchema = z.object({
  terminalId: z.string(),
  cashIn: z.coerce.number(),
  cashOut: z.coerce.number(),
});

type CashFlowFormCreateType = z.infer<typeof CashFlowFormCreateSchema>;

export function CashFlowFormCreate() {
  const { toast } = useToast();

  const formMethods = useForm<CashFlowFormCreateType>({
    resolver: zodResolver(CashFlowFormCreateSchema),
    defaultValues: {},
  });

  const { control, handleSubmit } = formMethods;

  const onSubmit = async (data: CashFlowFormCreateType) => {
    try {
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Favor tente novamente mais tarde.',
        duration: 5000,
      });
    }
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
        <FormField
          control={control}
          name='terminalId'
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
                  <SelectItem value='m@example.com'>m@example.com</SelectItem>
                  <SelectItem value='m@google.com'>m@google.com</SelectItem>
                  <SelectItem value='m@support.com'>m@support.com</SelectItem>
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
              <FormLabel>Ganhos R$</FormLabel>
              <FormControl>
                <Input placeholder='Ganhos no terminal' {...field} />
              </FormControl>
              <FormDescription>Ganhos no terminal no período.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='cashOut'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Perdas R$</FormLabel>
              <FormControl>
                <Input placeholder='Perdas no terminal' {...field} />
              </FormControl>
              <FormDescription>Perdas no terminal no período.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Alert>
          <Calendar className='h-4 w-4' />
          <AlertTitle>Período</AlertTitle>
          <AlertDescription>01/08/2023 - 31/08/2023</AlertDescription>
          <AlertDescription className='text-xs text-gray-300'>
            Última leitura - 31/07/2023
          </AlertDescription>
        </Alert>
        <Button type='submit' className='w-full'>
          Criar
        </Button>
      </form>
    </Form>
  );
}
