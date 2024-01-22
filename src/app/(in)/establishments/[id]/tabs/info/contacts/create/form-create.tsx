'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { createEstablishmentContact } from '@/app/(in)/establishments/actions/create-establishment-contact';
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
import { SheetContext } from '@/providers/sheet-provider';

const EstablishmentContactFormCreateSchema = z.object({
  name: z.string({ required_error: 'Nome não pode ser vazio.' }),
  phone: z.string({ required_error: 'Telefone não pode ser vazio.' }),
});

type EstablishmentContactFormCreateType = z.infer<
  typeof EstablishmentContactFormCreateSchema
>;

interface EstablishmentContactFormCreateProps {
  establishmentId: string;
}

export function EstablishmentContactFormCreate({
  establishmentId,
}: EstablishmentContactFormCreateProps) {
  const { setShow } = useContext(SheetContext);
  const { toast } = useToast();

  const formMethods = useForm<EstablishmentContactFormCreateType>({
    resolver: zodResolver(EstablishmentContactFormCreateSchema),
  });

  const { control, handleSubmit, formState } = formMethods;

  const onSubmit = async (data: EstablishmentContactFormCreateType) => {
    try {
      await createEstablishmentContact({
        establishmentId,
        ...data,
      });

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Contato do local criado com sucesso.',
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
