'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { fetchAddressByCep } from '@/actions/fetch-address-by-cep';
import { createEstablishmentAddress } from '@/app/(in)/establishments/actions/create-establishment-address';
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

const EstablishmentAddressFormCreateSchema = z.object({
  street: z.string({ required_error: 'Rua não pode ser vazio.' }),
  number: z.string({ required_error: 'Número não pode ser vazio.' }),
  additional: z.string().optional(),
  district: z.string({ required_error: 'Bairro não pode ser vazio.' }),
  city: z.string({ required_error: 'Cidade não pode ser vazio.' }),
  state: z.string({ required_error: 'Estado não pode ser vazio.' }),
  zipCode: z
    .string({ required_error: 'CEP não pode ser vazio.' })
    .refine((value) => value.length === 8, {
      message: 'CEP inválido.',
    }),
});

type EstablishmentAddressFormCreateType = z.infer<
  typeof EstablishmentAddressFormCreateSchema
>;

interface EstablishmentAddressFormCreateProps {
  establishmentId: string;
}

export function EstablishmentAddressFormCreate({
  establishmentId,
}: EstablishmentAddressFormCreateProps) {
  const { setShow } = useContext(SheetContext);
  const { toast } = useToast();

  const formMethods = useForm<EstablishmentAddressFormCreateType>({
    resolver: zodResolver(EstablishmentAddressFormCreateSchema),
  });

  const { control, handleSubmit, formState, watch, setValue, setFocus } =
    formMethods;

  const zipCode = watch('zipCode');

  const onSubmit = async (data: EstablishmentAddressFormCreateType) => {
    try {
      await createEstablishmentAddress({
        establishmentId,
        additional: data.additional || '',
        ...data,
      });

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Endereço do local criado com sucesso.',
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

  useEffect(() => {
    if (zipCode && zipCode.length === 8) {
      const fetchAddress = async () => {
        const response = await fetchAddressByCep(zipCode);
        console.log(
          '🚀 ~ file: form-create.tsx:87 ~ fetchAddress ~ response:',
          response
        );

        if (!response.logradouro) {
          toast({
            variant: 'destructive',
            title: 'Erro',
            description: 'CEP não encontrado.',
            duration: 5000,
          });

          return;
        }

        setValue('street', response.logradouro);
        setValue('additional', response.complemento);
        setValue('district', response.bairro);
        setValue('city', response.localidade);
        setValue('state', response.uf);

        setFocus('number');
      };

      fetchAddress();
    }
  }, [setFocus, setValue, toast, zipCode]);

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
        <FormField
          control={control}
          name='zipCode'
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP</FormLabel>
              <FormControl>
                <Input placeholder='CEP do local' {...field} />
              </FormControl>
              <FormDescription>
                CEP do local para preenchimento automático.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='street'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rua</FormLabel>
              <FormControl>
                <Input placeholder='Rua do local' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='number'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número</FormLabel>
              <FormControl>
                <Input placeholder='Número do local' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='district'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bairro</FormLabel>
              <FormControl>
                <Input placeholder='Bairro do local' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='additional'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Complemento</FormLabel>
              <FormControl>
                <Input placeholder='Complemento do local' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='city'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade</FormLabel>
              <FormControl>
                <Input placeholder='Cidade do local' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='state'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <FormControl>
                <Input placeholder='Estado do local' {...field} />
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
