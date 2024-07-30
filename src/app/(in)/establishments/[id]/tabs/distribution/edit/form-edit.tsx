'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { deleteEstablishmentDistribution } from '@/app/(in)/establishments/actions/delete-establishment-distribution';
import { EstablishmentDistribution } from '@/app/(in)/establishments/actions/fetch-establishment-distributions';
import { updateEstablishmentDistribution } from '@/app/(in)/establishments/actions/update-establishment-distribution';
import { ConfirmDeletionDialog } from '@/components/confirm-deletion-dialog';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import { DialogProvider } from '@/providers/dialog-provider';
import { SheetContext } from '@/providers/sheet-provider';

const EstablishmentDistributionFormEditSchema = z.object({
  name: z.string({ required_error: 'Nome não pode ser vazio.' }),
  description: z.string().optional(),
  percentage: z.coerce
    .number({ required_error: 'Percentual não pode ser vazio.' })
    .refine((value) => value > 0 && value <= 100, {
      message: 'Percentual inválido.',
    })
    .transform((value) => {
      value = value * 100;

      return value;
    }),
  percentageOutOfDistribution: z.enum(['JETTI', 'ESTABLISHMENT', 'TOTAL']).optional(),
});

type EstablishmentDistributionFormEditType = z.infer<
  typeof EstablishmentDistributionFormEditSchema
>;

interface EstablishmentDistributionFormEditProps {
  establishmentDistribution: EstablishmentDistribution;
}

export function EstablishmentDistributionFormEdit({
  establishmentDistribution,
}: EstablishmentDistributionFormEditProps) {
  const { setShow } = useContext(SheetContext);
  const { toast } = useToast();

  const formMethods = useForm<EstablishmentDistributionFormEditType>({
    resolver: zodResolver(EstablishmentDistributionFormEditSchema),
    defaultValues: {
      name: establishmentDistribution.name,
      description: establishmentDistribution.description ?? '',
      percentage: establishmentDistribution.percentage / 100,
      percentageOutOfDistribution: establishmentDistribution.percentageOutOfDistribution,
    },
  });

  const { handleSubmit, formState, control } = formMethods;

  const onSubmit = async (data: EstablishmentDistributionFormEditType) => {
    try {
      await updateEstablishmentDistribution({
        id: establishmentDistribution.id,
        data: {
          establishmentId: establishmentDistribution.establishmentId,
          ...data,
        },
      });

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Distribuição alterada com sucesso.',
        duration: 5000,
      });
    } catch {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Limite total do percentual de lucro ultrapassou os 100%.',
        duration: 5000,
      });
    }
  };

  const handleDeleteEsblishmentDistribution = async () => {
    try {
      await deleteEstablishmentDistribution(establishmentDistribution.id);

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Distribuição excluída com sucesso.',
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

  const isJetti = establishmentDistribution.name
    .toLowerCase()
    .includes('jetti');

  const isEstablishment = establishmentDistribution.name
    .toLowerCase()
    .includes('local');

  return (
    <div className='space-y-6'>
      <Form {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
          <FormField
            control={control}
            name='name'
            disabled={isJetti}
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
            disabled={isJetti}
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
            disabled={isJetti}
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

          {
            !isJetti && !isEstablishment && (
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
            )
          }
          

          {!isJetti && (
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
                <ConfirmDeletionDialog
                  onConfirm={handleDeleteEsblishmentDistribution}
                >
                  <Button
                    type='button'
                    variant='destructive'
                    className='w-full'
                  >
                    Excluir
                  </Button>
                </ConfirmDeletionDialog>
              </DialogProvider>
            </div>
          )}
          {isJetti && (
            <Alert variant={'destructive'}>
              <AlertTitle>Informação!</AlertTitle>
              <AlertDescription>
                O percentual de distribuição da Jetti é calculado
                automaticamente e não pode ser modificado
              </AlertDescription>
            </Alert>
          )}
        </form>
      </Form>
    </div>
  );
}
