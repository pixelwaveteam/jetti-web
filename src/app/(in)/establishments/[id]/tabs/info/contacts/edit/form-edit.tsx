'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { deleteEstablishmentContact } from '@/app/(in)/establishments/actions/delete-establishment-contact';
import { EstablishmentContact } from '@/app/(in)/establishments/actions/fetch-establishment-contacts';
import { updateEstablishmentContact } from '@/app/(in)/establishments/actions/update-establishment-contact';
import { ConfirmDeletionDialog } from '@/components/confirm-deletion-dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { DialogProvider } from '@/providers/dialog-provider';
import { SheetContext } from '@/providers/sheet-provider';

const EstablishmentContactFormEditSchema = z.object({
  name: z.string({ required_error: 'Nome não pode ser vazio.' }),
  phone: z.string({ required_error: 'Telefone não pode ser vazio.' }),
});

type EstablishmentContactFormEditType = z.infer<
  typeof EstablishmentContactFormEditSchema
>;

interface EstablishmentContactFormEditProps {
  establishmentContact: EstablishmentContact;
}

export function EstablishmentContactFormEdit({
  establishmentContact,
}: EstablishmentContactFormEditProps) {
  const { setShow } = useContext(SheetContext);
  const { toast } = useToast();

  const formMethods = useForm<EstablishmentContactFormEditType>({
    resolver: zodResolver(EstablishmentContactFormEditSchema),
    defaultValues: {
      name: establishmentContact.name,
      phone: establishmentContact.phone,
    },
  });

  const { handleSubmit, formState, control } = formMethods;

  const onSubmit = async (data: EstablishmentContactFormEditType) => {
    try {
      await updateEstablishmentContact({
        id: establishmentContact.id,
        data: {
          establishmentId: establishmentContact.establishmentId,
          ...data,
        },
      });

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Contato do Local alterado com sucesso.',
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

  const handleDeleteEsblishmentContact = async () => {
    try {
      await deleteEstablishmentContact(establishmentContact.id);

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Contato do local excluida com sucesso.',
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
                  <Input placeholder='Nome de contato' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder='Telefone do contato' {...field} />
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
              <ConfirmDeletionDialog onConfirm={handleDeleteEsblishmentContact}>
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
