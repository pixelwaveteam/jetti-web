'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { changePassword } from '@/app/(in)/profile/actions/change-password';
import { User } from '@/app/(in)/users/columns';
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
import { SheetContext } from '@/providers/sheet-provider';

const ChangePasswordFormSchema = z
  .object({
    password: z
      .string({ required_error: 'Senha é obrigatória.' })
      .min(5, 'Senha deve ter pelo menos 6 caracteres.')
      .max(15, 'Senha deve ter no máximo 15 caracteres.'),
    passwordConfirmation: z.string({
      required_error: 'Confirmação é obrigatória.',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem.',
    path: ['passwordConfirmation'],
  });

type ChangePasswordFormType = z.infer<typeof ChangePasswordFormSchema>;

interface ChangePasswordFormProps {
  user: User;
}

export function ChangePasswordForm() {
  const { toast } = useToast();
  const { setShow } = useContext(SheetContext);

  const formMethods = useForm<ChangePasswordFormType>({
    resolver: zodResolver(ChangePasswordFormSchema),
  });

  const { handleSubmit, control, formState } = formMethods;

  const onSubmit = async (data: ChangePasswordFormType) => {
    try {
      console.log('data', data);

      await changePassword({
        ...data,
      });

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Senha alterada com sucesso.',
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
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='Senha' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='passwordConfirmation'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar Senha</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='Confirmar Senha'
                    {...field}
                  />
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
          </div>
        </form>
      </Form>
    </div>
  );
}
