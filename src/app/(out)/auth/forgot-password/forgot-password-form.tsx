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

const ForgotPasswordFormSchema = z.object({
  email: z.string().min(1, 'Email obrigatório').email('Email inválido'),
});

type ForgotPasswordFormSchemaType = z.infer<typeof ForgotPasswordFormSchema>;

export const ForgotPasswordForm = () => {
  const formMethods = useForm<ForgotPasswordFormSchemaType>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: ForgotPasswordFormSchemaType) => {
    console.log(data);
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-4'>
          <FormField
            control={formMethods.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='mail@examplo.com' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-10' type='submit'>
          Enviar link de recuperação
        </Button>
        <div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-gray-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-gray-400'>
          ou
        </div>
        <div className='flex items-center justify-center'>
          <Link
            href='/auth/signin'
            className='text-sm border text-gray-100 mt-2 hover:underline'
          >
            Voltar para login
          </Link>
        </div>
      </form>
    </Form>
  );
};
