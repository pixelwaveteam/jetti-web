'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { createExpense } from '@/app/(in)/expenses/actions/create-expense';
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
import { useToast } from '@/hooks/use-toast';
import { SheetContext } from '@/providers/sheet-provider';

const ExpenseFormCreateSchema = z.object({
  name: z
    .string({ required_error: 'Nome não pode ser vazio.' })
    .max(50, 'Nome deve ter no máximo 50 caracteres.'),
});

type ExpenseFormCreateType = z.infer<typeof ExpenseFormCreateSchema>;

export function ExpenseFormCreate() {
  const { toast } = useToast();
  const { setShow } = useContext(SheetContext);

  const formMethods = useForm<ExpenseFormCreateType>({
    resolver: zodResolver(ExpenseFormCreateSchema),
    defaultValues: {
      name: '',
    },
  });

  const { control, formState, handleSubmit } = formMethods;

  const onSubmit = async (data: ExpenseFormCreateType) => {
    try {
      await createExpense({
        ...data,
      });

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Despesa criada com sucesso.',
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

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
        <FormField
          control={control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder='Nome da despesa' {...field} />
              </FormControl>
              <FormDescription>
                Esse nome será exibido em telas e relatórios.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          disabled={formState.isSubmitting}
          className='w-full'
        >
          {formState.isSubmitting ? (
            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          ) : (
            'Criar'
          )}
        </Button>
      </form>
    </Form>
  );
}
