'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
import { useToast } from '@/hooks/use-toast';
import { DialogProvider } from '@/providers/dialog-provider';
import { SheetContext } from '@/providers/sheet-provider';
import { deleteOrganizationExpense } from '../actions/delete-organization-expense';
import { updateOrganizationExpense } from '../actions/update-organization-expense';
import { OrganizationExpenseDataTableData } from '../columns';

const OrganizationExpenseFormEditSchema = z.object({
  name: z.string({ required_error: 'Nome não pode ser vazio.' }),
  amount: z.coerce
    .number({
      required_error: 'Entrada é obrigatório.',
      invalid_type_error: 'Entrada deve ser um número. Substitua "," por "."',
    })
    .transform((value) => value * 100),
});

type OrganizationExpenseFormEditType = z.infer<typeof OrganizationExpenseFormEditSchema>;

interface OrganizationExpenseFormEditProps {
  organizationExpense: OrganizationExpenseDataTableData;
}

export function OrganizationExpenseFormEdit({
  organizationExpense,
}: OrganizationExpenseFormEditProps) {
  const { toast } = useToast();
  const { setShow } = useContext(SheetContext);

  const formMethods = useForm<OrganizationExpenseFormEditType>({
    resolver: zodResolver(OrganizationExpenseFormEditSchema),
    defaultValues: {
      name: organizationExpense.name,
      amount: organizationExpense.amount/100,
    },
  });

  const { handleSubmit, control, formState } = formMethods;

  const onSubmit = async (data: OrganizationExpenseFormEditType) => {
    try {
      await updateOrganizationExpense({
        id: organizationExpense.id,
        data,
      });

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Despesa alterada com sucesso.',
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

  const handleDeleteExpense = async () => {
    try {
      await deleteOrganizationExpense(organizationExpense.id);

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Despesa excluída com sucesso.',
        duration: 5000,
      });
    } catch(err) {
      if(err instanceof Error && err.message === "Organization expense has dependents.") {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: 'Essa despesa tem registros associados à ela. Para exclui-la, exclua suas associações antes!',
          duration: 7000,
        });

        setShow(false);

        return
      }

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
          <div className='flex gap-2'>
            <Button
              type='submit'
              disabled={formState.isSubmitting}
              className='w-full'
            >
              {formState.isSubmitting ? (
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                'Alterar'
              )}
            </Button>
            <DialogProvider>
              <ConfirmDeletionDialog onConfirm={handleDeleteExpense}>
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
