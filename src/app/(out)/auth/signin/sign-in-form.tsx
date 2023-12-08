'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
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
import { useRouter, useSearchParams } from 'next/navigation';

const SignInFormSchema = z.object({
  email: z.string().min(1, 'Email obrigatório').email('Email inválido'),
  password: z
    .string()
    .min(1, 'Senha obrigatória')
    .min(5, 'Senha deve ter 5 caracteres no mínimo'),
});

type SignInFormSchemaType = z.infer<typeof SignInFormSchema>;

export const SignInForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const formMethods = useForm<SignInFormSchemaType>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleSubmit, control } = formMethods;

  const onSubmit = async (data: SignInFormSchemaType) => {
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (response?.error) {
      console.log(response.error);
    }

    if (response?.ok) {
      router.push(callbackUrl);
    }
  };

  return (
    <Form {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-4'>
          <FormField
            control={control}
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
          <FormField
            control={control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='flex flex-row justify-between'>
                  Senha
                  <Link
                    className='text-gray-300 hover:underline'
                    href='/auth/forgot-password'
                  >
                    Esquceu Senha?
                  </Link>
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
        </div>
        <Button className='w-full mt-10' type='submit'>
          Entrar
        </Button>
      </form>
    </Form>
  );
};
