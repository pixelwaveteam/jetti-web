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
import { useToast } from '@/hooks/use-toast';
import { useRouter, useSearchParams } from 'next/navigation';

const SignInFormSchema = z.object({
  name: z.string({ required_error: 'Nome é obrigatório' }),
  password: z
    .string()
    .min(1, 'Senha obrigatória')
    .min(5, 'Senha deve ter 5 caracteres no mínimo'),
});

type SignInFormSchemaType = z.infer<typeof SignInFormSchema>;

export const SignInForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const formMethods = useForm<SignInFormSchemaType>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      password: '',
    },
  });

  const { handleSubmit, control, setFocus } = formMethods;

  const onSubmit = async (data: SignInFormSchemaType) => {
    const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

    const response = await signIn('credentials', {
      name: data.name,
      password: data.password,
      redirect: false,
    });

    if (response?.error) {
      // set focus to name input using react-hook-form
      setFocus('name');

      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Nome ou senha incorretos. Favor tente novamente.',
        duration: 5000,
      });
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
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder='John Doe'
                    {...field}
                    tabIndex={1}
                  />
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
                    className='text-indigo-400 hover:underline hover:text-indigo-300'
                    href='/auth/forgot-password'
                    tabIndex={3}
                  >
                    Esquceu Senha?
                  </Link>
                </FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Digite sua senha'
                    {...field}
                    tabIndex={2}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className='w-full mt-10' type='submit' tabIndex={4}>
          Entrar
        </Button>
      </form>
    </Form>
  );
};
