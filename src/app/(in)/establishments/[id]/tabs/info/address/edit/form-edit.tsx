'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { deleteEstablishmentAddress } from '@/app/(in)/establishments/actions/delete-establishment-address';
import { EstablishmentAddress } from '@/app/(in)/establishments/actions/fetch-establishment-address';
import { updateEstablishmentAddress } from '@/app/(in)/establishments/actions/update-establishment-address';
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
import braziliansCitiesByState from '@/data/brazilian-cities-by-state.json';
import braziliansStates from '@/data/brazilian-states.json';
import { useToast } from '@/hooks/use-toast';
import { DialogProvider } from '@/providers/dialog-provider';
import { SheetContext } from '@/providers/sheet-provider';
import { Loader2 } from 'lucide-react';
import { useContext } from 'react';

const EstablishmentAddressFormEditSchema = z.object({
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

type EstablishmentAddressFormEditType = z.infer<
  typeof EstablishmentAddressFormEditSchema
>;

interface EstablishmentAddressFormEditProps {
  establishmentAddress: EstablishmentAddress;
}

const statesItems = braziliansStates.reduce(
  (acc, state) => [...acc, [state.shortName, state.name]],
  [] as string[][]
);

const cityItems = braziliansCitiesByState.states.reduce(
  (acc, state) => ({ ...acc, [state.short]: state.cities }),
  {} as { [x: string]: string[] }
);

export function EstablishmentAddressFormEdit({
  establishmentAddress,
}: EstablishmentAddressFormEditProps) {
  const { setShow } = useContext(SheetContext);
  const { toast } = useToast();

  const formMethods = useForm<EstablishmentAddressFormEditType>({
    resolver: zodResolver(EstablishmentAddressFormEditSchema),
    defaultValues: {
      street: establishmentAddress.street,
      number: establishmentAddress.number,
      additional: establishmentAddress.additional ?? '',
      district: establishmentAddress.district,
      city: establishmentAddress.city,
      state: establishmentAddress.state,
      zipCode: establishmentAddress.zipCode ?? '',
    },
  });

  const { handleSubmit, formState, control, watch } = formMethods;

  const state = watch('state');

  const cityItemsByState =
    cityItems[state as keyof typeof cityItems] || undefined;

  const onSubmit = async (data: EstablishmentAddressFormEditType) => {
    try {
      await updateEstablishmentAddress({
        id: establishmentAddress.id,
        data: {
          establishmentId: establishmentAddress.establishmentId,
          ...data,
        },
      });

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Endereço do Local alterado com sucesso.',
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

  async function handleDelete() {
    try {
      await deleteEstablishmentAddress(establishmentAddress.id);

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Endereço do Local excluído com sucesso.',
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
  }

  function formatZipInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace('-', '');
    return value;
  }

  return (
    <div className='space-y-6'>
      <Form {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
          <FormField
            control={control}
            name='zipCode'
            render={({ field: { onChange , ...field } }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <Input placeholder='CEP do local' onChange={e => onChange(formatZipInput(e))} {...field} />
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Selecione...' />
                    </SelectTrigger>

                    <SelectContent>
                      {statesItems.map((item) => (
                        <SelectItem value={item[0]} key={item[0]}>
                          {item[1]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!state}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Selecione...' />
                    </SelectTrigger>

                    <SelectContent>
                      {cityItemsByState &&
                        cityItemsByState.map((item) => (
                          <SelectItem value={item} key={item}>
                            {item}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
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
              <ConfirmDeletionDialog onConfirm={handleDelete}>
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
