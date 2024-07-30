'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SearchableSelect, SearchableSelectContent, SearchableSelectItem, SearchableSelectTrigger, SearchableSelectValue } from '@/components/ui/searchable-select';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { OrganizationExpenseContext } from '@/providers/expense-provider';
import { SheetContext } from '@/providers/sheet-provider';
import { createExpense } from '../../expenses/actions/create-expense';
import { createOrganizationExpense } from '../actions/create-organization-expense';

const OrganizationExpenseFormCreateSchema = z.object({
  organizationId: z.string({ required_error: 'Organização não pode ser vazia.' }),
  expenseId: z.string({ required_error: 'Organização não pode ser vazia.' }),
  amount: z.coerce
    .number({
      required_error: 'Entrada é obrigatório.',
      invalid_type_error: 'Entrada deve ser um número. Substitua "," por "."',
    })
    .transform((value) => value * 100),
});

type OrganizationExpenseFormCreateType = z.infer<typeof OrganizationExpenseFormCreateSchema>;

export function OrganizationExpenseFormCreate() {
  const { toast } = useToast();

  const { setShow } = useContext(SheetContext);

  const { organizations, expenses } = useContext(OrganizationExpenseContext);

  const formMethods = useForm<OrganizationExpenseFormCreateType>({
    resolver: zodResolver(OrganizationExpenseFormCreateSchema),
    defaultValues: {
      organizationId: organizations.length > 1 ? '' : organizations[0].id
    }
  });

  const { control, formState, handleSubmit } = formMethods;

  const onSubmit = async ({ expenseId, ...data }: OrganizationExpenseFormCreateType) => {
    try {
      const selectedExpenseName = expenses.find(({ id }) => id === expenseId)?.name || '';

      const selectedOrganizationName = organizations.find(({ id }) => id === data.organizationId)?.name || '';

      const expensesNames = expenses.map(({ name }) => name)

      const expenseName = `${selectedExpenseName} - ${selectedOrganizationName}`

      const higherRegisteredExpenseNameNumber = expensesNames
        .filter(name => name.includes(expenseName))
        .reduce((acc, name) =>
            name.replaceAll(/[^-]+/g, '').length > 1 ? 
              Number(name.match(/\d+/g)) > acc ? Number(name.match(/\d+/g)) : acc
              : acc, 
          0,
        );

      const completeExpenseName = `${expenseName} -  ${higherRegisteredExpenseNameNumber+1}`

      const { expense } = await createExpense({
        name: completeExpenseName
      });

      await createOrganizationExpense({
        expenseId: expense.id,
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
      console.log({error})

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
          name='organizationId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organização</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione...' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {organizations.map((organization) => (
                    <SelectItem key={organization.id} value={organization.id}>
                      {organization.name}
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
          name='expenseId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Despesa</FormLabel>

              <SearchableSelect
                value={field.value}
                onValueChange={field.onChange}
              >
                <SearchableSelectTrigger>
                  <SearchableSelectValue placeholder='Selecione...' />
                </SearchableSelectTrigger>

                <SearchableSelectContent label='despesas'>
                  {
                    expenses.filter(({name}) => name.replaceAll(/[^-]+/g, '').length <= 1).map(expense => (
                      <SearchableSelectItem textValue={expense.name} value={expense.id} key={expense.id}>
                        {expense.name}
                      </SearchableSelectItem>
                    ))
                  }
                </SearchableSelectContent>
              </SearchableSelect>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <Input placeholder='Valor da despesa' {...field} />
              </FormControl>
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
