'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { createEstablishment } from '@/app/(in)/establishments/actions/create-establishment';
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
import { EstablishmentContext } from '@/providers/establishment-provider';
import { SheetContext } from '@/providers/sheet-provider';
import { useRouter } from 'next/navigation';

const EstablishmentFormCreateSchema = z.object({
  organizationId: z.string({ required_error: 'Selecione uma organização.' }),
  name: z
    .string({ required_error: 'Nome não pode ser vazio.' })
    .min(3, 'Nome deve ter pelo menos 3 caractere.')
    .max(50, 'Nome deve ter no máximo 50 caracteres.'),
});

type EstablishmentFormCreateType = z.infer<
  typeof EstablishmentFormCreateSchema
>;

export function EstablishmentFormCreate() {
  const router = useRouter();
  const { organizations } = useContext(EstablishmentContext);
  const { setShow } = useContext(SheetContext);
  const { toast } = useToast();

  const formMethods = useForm<EstablishmentFormCreateType>({
    resolver: zodResolver(EstablishmentFormCreateSchema),
    defaultValues: {
      name: '',
    },
  });

  const { control, handleSubmit, formState } = formMethods;

  const onSubmit = async (data: EstablishmentFormCreateType) => {
    try {
      const establishmentCreated = await createEstablishment({
        ...data,
      });

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Local criado com sucesso.',
        duration: 5000,
      });

      router.push(`/establishments/${establishmentCreated.id}`);
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
