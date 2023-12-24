'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { TerminalContext } from '@/providers/terminal-provider';
import { useContext } from 'react';

const TerminalFormCreateSchema = z.object({
  establishmentId: z.string(),
  interfaceId: z.string(),
  code: z
    .string({ required_error: 'Código não pode ser vazio.' })
    .min(3, 'Código deve ter pelo menos 3 caractere.')
    .max(10, 'Código deve ter no máximo 10 caracteres.'),
});

type TerminalFormCreateType = z.infer<typeof TerminalFormCreateSchema>;

export function TerminalFormCreate() {
  const { toast } = useToast();
  const { organizations } = useContext(TerminalContext);

  const formMethods = useForm<TerminalFormCreateType>({
    resolver: zodResolver(TerminalFormCreateSchema),
    defaultValues: {},
  });

  const { control, handleSubmit } = formMethods;

  const onSubmit = async (data: TerminalFormCreateType) => {
    try {
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
        <FormField
          control={control}
          name='interfaceId'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Interface</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione...' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value='m@example.com'>m@example.com</SelectItem>
                  <SelectItem value='m@google.com'>m@google.com</SelectItem>
                  <SelectItem value='m@support.com'>m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full'>
          Criar
        </Button>
      </form>
    </Form>
  );
}
