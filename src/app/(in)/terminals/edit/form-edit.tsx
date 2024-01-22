'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { deleteTerminal } from '@/app/(in)/terminals/actions/delete-terminal';
import { updateTerminal } from '@/app/(in)/terminals/actions/update-terminal';
import { Terminal } from '@/app/(in)/terminals/columns';
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
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { DialogProvider } from '@/providers/dialog-provider';
import { SheetContext } from '@/providers/sheet-provider';
import { TerminalContext } from '@/providers/terminal-provider';

const TerminalFormEditSchema = z.object({
  establishmentId: z.string({ required_error: 'Local não pode ser vazio.' }),
  interfaceId: z.string({ required_error: 'Interface não pode ser vazia.' }),
  code: z
    .string({ required_error: 'Código não pode ser vazio.' })
    .max(10, 'Código deve ter no máximo 10 caracteres.'),
  isActive: z.boolean(),
});

type TerminalFormEditType = z.infer<typeof TerminalFormEditSchema>;

interface TerminalFormEditProps {
  terminal: Terminal;
}

export function TerminalFormEdit({ terminal }: TerminalFormEditProps) {
  const { toast } = useToast();
  const { setShow } = useContext(SheetContext);
  const { establishments, interfaces } = useContext(TerminalContext);

  const formMethods = useForm<TerminalFormEditType>({
    resolver: zodResolver(TerminalFormEditSchema),
    defaultValues: {
      establishmentId: terminal.establishmentId,
      interfaceId: terminal.interfaceId,
      code: terminal.code,
      isActive: terminal.isActive,
    },
  });

  const { handleSubmit, control } = formMethods;

  const onSubmit = async (data: TerminalFormEditType) => {
    try {
      await updateTerminal({
        id: terminal.id,
        data,
      });

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Terminal alterado com sucesso.',
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

  const handleDeleteTerminal = async () => {
    try {
      await deleteTerminal(terminal.id);

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Terminal excluido com sucesso.',
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
            name='code'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código</FormLabel>
                <FormControl>
                  <Input placeholder='Código do terminal' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='establishmentId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Local</FormLabel>
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
                    {establishments.map((establishment) => (
                      <SelectItem
                        key={establishment.id}
                        value={establishment.id}
                      >
                        {establishment.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='interfaceId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interface</FormLabel>
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
                    {interfaces.map((interfaceItem) => (
                      <SelectItem
                        key={interfaceItem.id}
                        value={interfaceItem.id}
                      >
                        {interfaceItem.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='isActive'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-md border p-4'>
                <div className='space-y-0.5'>
                  <FormLabel className='text-base'>
                    Status do terminal
                  </FormLabel>
                  <FormDescription>
                    Terminal precisa estar ativo para realizar leituras.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className='flex gap-2'>
            <Button type='submit' className='w-full'>
              Alterar
            </Button>
            <DialogProvider>
              <ConfirmDeletionDialog onConfirm={handleDeleteTerminal}>
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
