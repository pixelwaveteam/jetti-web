'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { deleteInterface } from '@/app/(in)/interfaces/actions/delete-interface';
import { updateInterface } from '@/app/(in)/interfaces/actions/update-interface';
import { Interface } from '@/app/(in)/interfaces/columns';
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

const InterfaceFormEditSchema = z.object({
  name: z.string({ required_error: 'Nome não pode ser vazio.' }),
});

type InterfaceFormEditType = z.infer<typeof InterfaceFormEditSchema>;

interface InterfaceFormEditProps {
  interfaceTerminal: Interface;
}

export function InterfaceFormEdit({
  interfaceTerminal,
}: InterfaceFormEditProps) {
  const { toast } = useToast();
  const { setShow } = useContext(SheetContext);

  const formMethods = useForm<InterfaceFormEditType>({
    resolver: zodResolver(InterfaceFormEditSchema),
    defaultValues: {
      name: interfaceTerminal.name,
    },
  });

  const { handleSubmit, control, formState } = formMethods;

  const onSubmit = async (data: InterfaceFormEditType) => {
    try {
      await updateInterface({
        id: interfaceTerminal.id,
        data,
      });

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Interface alterada com sucesso.',
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

  const handleDeleteInterface = async () => {
    try {
      await deleteInterface(interfaceTerminal.id);

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Interface excluida com sucesso.',
        duration: 5000,
      });
    } catch(err) {
      if(err instanceof Error && err.message === "Interface has dependents.") {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: 'Essa interface tem registros associados à ela. Para exclui-la, exclua suas associações antes!',
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
                  <Input placeholder='Nome da interface' {...field} />
                </FormControl>
                <FormDescription>
                  Nome da interface utilizada nos terminais.
                </FormDescription>
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
              <ConfirmDeletionDialog onConfirm={handleDeleteInterface}>
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
