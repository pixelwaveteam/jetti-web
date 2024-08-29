'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { createEstablishmentDistribution } from '@/app/(in)/establishments/actions/create-establishment-distribution';
import { EstablishmentDistribution } from '@/app/(in)/establishments/actions/fetch-establishment-distributions';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { SheetContext } from '@/providers/sheet-provider';

const EstablishmentDistributionFormCreateSchema = z.object({
  name: z.string({ required_error: 'Nome não pode ser vazio.' }),
  description: z.string().optional(),
  percentage: z.coerce
    .number({
      required_error: 'Percentual não pode ser vazio.',
      invalid_type_error: 'Percentual deve ser um número.',
    })
    .refine((value) => value > 0 && value <= 100, {
      message: 'Percentual inválido.',
    })
    .transform((value) => {
      value = value * 100;

      return value;
    }),
  percentageOutOfDistribution: z.enum(['JETTI', 'ESTABLISHMENT', 'TOTAL'])
});

type EstablishmentDistributionFormCreateType = z.infer<
  typeof EstablishmentDistributionFormCreateSchema
>;

interface EstablishmentDistributionFormCreateProps {
  establishmentId: string;
  establishmentDistributions: EstablishmentDistribution[];
}

export function EstablishmentDistributionFormCreate({
  establishmentId,
  establishmentDistributions,
}: EstablishmentDistributionFormCreateProps) {
  const { setShow } = useContext(SheetContext);
  const { toast } = useToast();

  const formMethods = useForm<EstablishmentDistributionFormCreateType>({
    resolver: zodResolver(EstablishmentDistributionFormCreateSchema),
    defaultValues: {
      percentageOutOfDistribution: 'TOTAL'
    }
  });

  console.log({ establishmentDistributions })

  const { control, handleSubmit, formState } = formMethods;

  const onSubmit = async ({ ...data }: EstablishmentDistributionFormCreateType) => {
    try {
      await createEstablishmentDistribution({
        establishmentId,
        description: data.description || '',
        ...data,
      });

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Distribuição criada com sucesso.',
        duration: 5000,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Limite total do percentual de lucro ultrapassou os 100%.',
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
                <Input placeholder='Nome' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Descrição da distribuição'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='percentage'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Percentual (%)</FormLabel>
              <FormControl>
                <Input placeholder='Percentual' {...field} />
              </FormControl>
              <FormDescription>
                O percentual deve ser um número entre 0 e 100. Ex: 5, 30, 50
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

      <FormField
        control={control}
        name='percentageOutOfDistribution'
        render={({ field: { onChange, ...field } }) => (
          <FormItem>
            <FormLabel>Percentual relativo a</FormLabel>
            <Select
              onValueChange={onChange}
              {...field}
            >
              <SelectTrigger className="flex-1 min-w-[15rem]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="JETTI">
                  Jetti
                </SelectItem>
                <SelectItem value="TOTAL">
                  Total
                </SelectItem>
                <SelectItem value="ESTABLISHMENT">
                  Local
                </SelectItem>
              </SelectContent>
            </Select>
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
