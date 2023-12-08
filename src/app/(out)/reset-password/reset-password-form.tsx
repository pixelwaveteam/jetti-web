'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
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

const ResetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Senha obrigatória')
      .min(8, 'Senha deve ter 8 caracteres no mínimo'),
    passwordConfirmation: z.string().min(1, 'Confirmação obrigatória'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Senhas não conferem',
    path: ['passwordConfirmation'],
  });

type ResetPasswordFormSchemaType = z.infer<typeof ResetPasswordFormSchema>;

export const ResetPasswordForm = () => {
  const formMethods = useForm<ResetPasswordFormSchemaType>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  });

  const onSubmit = (data: ResetPasswordFormSchemaType) => {
    console.log(data);
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-4'>
          <FormField
            control={formMethods.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex flex-row justify-between'>
                  Senha
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Digite sua senha'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formMethods.control}
            name='passwordConfirmation'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex flex-row justify-between'>
                  Confirmar Senha
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Digite a senha novamente'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-10' type='submit'>
          Criar senha
        </Button>
        <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-gray-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-gray-400'>
          ou
        </div>
        <div className='flex items-center justify-center'>
          <Link
            href='/sign-in'
            className='text-sm text-gray-100 mt-2 hover:underline'
          >
            Voltar para login
          </Link>
        </div>
      </form>
    </Form>
  );
};
