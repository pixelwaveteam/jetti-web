'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { deleteEstablishment } from '@/app/(in)/establishments/actions/delete-establishment';
import { updateEstablishment } from '@/app/(in)/establishments/actions/update-establishment';
import { Establishment } from '@/app/(in)/establishments/columns';
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
import { DialogProvider } from '@/providers/dialog-provider';
import { EstablishmentContext } from '@/providers/establishment-provider';
import { SheetContext } from '@/providers/sheet-provider';
import { Loader2 } from 'lucide-react';
import { useContext } from 'react';

const EstablishmentFormEditSchema = z.object({
  organizationId: z.string({ required_error: 'Selecione uma organização.' }),
  name: z
    .string()
    .min(3, 'Nome deve ter pelo menos 3 caractere.')
    .max(50, 'Nome deve ter no máximo 50 caracteres.')
    .refine((value) => value.trim().length > 0, {
      message: 'Nome não pode ser vazio.',
    }),
});

type EstablishmentFormEditType = z.infer<typeof EstablishmentFormEditSchema>;

interface EstablishmentFormEditProps {
  establishment: Establishment;
}

export function EstablishmentFormEdit({
  establishment,
}: EstablishmentFormEditProps) {
  const { organizations } = useContext(EstablishmentContext);
  const { setShow } = useContext(SheetContext);
  const { toast } = useToast();

  const formMethods = useForm<EstablishmentFormEditType>({
    resolver: zodResolver(EstablishmentFormEditSchema),
    defaultValues: {
      name: establishment.name,
      organizationId: establishment.organizationId,
    },
  });

  const { handleSubmit, formState, control } = formMethods;

  const onSubmit = async (data: EstablishmentFormEditType) => {
    try {
      await updateEstablishment({
        id: establishment.id,
        data,
      });

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Local alterado com sucesso.',
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

  const handleDeleteEstablishment = async () => {
    try {
      await deleteEstablishment(establishment.id);

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Local excluido com sucesso.',
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
                  <Input placeholder='Nome do local' {...field} />
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
            name='organizationId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Organização</FormLabel>
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
              <ConfirmDeletionDialog onConfirm={handleDeleteEstablishment}>
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
