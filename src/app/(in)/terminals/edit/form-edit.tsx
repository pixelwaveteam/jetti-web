'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Terminal } from '@/app/(in)/terminals/columns';
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

const TerminalFormEditSchema = z.object({
  establishmentId: z.string(),
  interfaceId: z.string(),
  code: z
    .string()
    .min(3, 'Código deve ter pelo menos 3 caractere.')
    .max(10, 'Código deve ter no máximo 10 caracteres.')
    .refine((value) => value.trim().length > 0, {
      message: 'Código não pode ser vazio.',
    }),
  isActive: z.boolean(),
});

type TerminalFormEditType = z.infer<typeof TerminalFormEditSchema>;

interface TerminalFormEditProps {
  terminal: Terminal;
}

export function TerminalFormEdit({ terminal }: TerminalFormEditProps) {
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

  const onSubmit = async (data: TerminalFormEditType) => {};

  const handleDeleteTerminal = async () => {};

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
                    <SelectItem value='m@example.com'>m@example.com</SelectItem>
                    <SelectItem value='m@google.com'>m@google.com</SelectItem>
                    <SelectItem value='m@support.com'>m@support.com</SelectItem>
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
                    <SelectItem value='m@example.com'>m@example.com</SelectItem>
                    <SelectItem value='m@google.com'>m@google.com</SelectItem>
                    <SelectItem value='m@support.com'>m@support.com</SelectItem>
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
              Save
            </Button>
            <Button
              type='button'
              variant='destructive'
              className='w-full'
              onClick={handleDeleteTerminal}
            >
              Delete
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
