'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { createUser } from '@/app/(in)/users/actions/create-user';
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
import { SheetContext } from '@/providers/sheet-provider';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';

const UserFormCreateSchema = z.object({
  name: z
    .string({ required_error: 'Nome não pode ser vazio.' })
    .max(50, 'Nome deve ter no máximo 50 caracteres.'),
  password: z
    .string({ required_error: 'Senha é obrigatória.' })
    .min(5, 'Senha deve ter pelo menos 6 caracteres.')
    .max(15, 'Senha deve ter no máximo 15 caracteres.'),
  role: z
    .enum(['ADMIN', 'OPERATOR'] as const)
    .refine((value) => value === 'ADMIN' || value === 'OPERATOR', {
      message: 'Permissão inválida.',
    }),
});

type UserFormCreateType = z.infer<typeof UserFormCreateSchema>;

export function UserFormCreate() {
  const { toast } = useToast();
  const { setShow } = useContext(SheetContext);
  const { data: session } = useSession();

  const role = session?.user?.role || 'OPERATOR';

  const formMethods = useForm<UserFormCreateType>({
    resolver: zodResolver(UserFormCreateSchema),
    defaultValues: {
      role: 'OPERATOR',
    },
  });

  const { control, handleSubmit } = formMethods;

  const onSubmit = async (data: UserFormCreateType) => {
    try {
      const { name, role: roleUser, password } = data;

      await createUser({
        name,
        password,
        role: roleUser,
      });

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Usuário criado com sucesso.',
        duration: 5000,
      });
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
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder='Nome do usuário' {...field} />
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
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input placeholder='Senha do usuário' type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name='role'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Permissão</FormLabel>
              <Select
                onValueChange={field.onChange}
                disabled={role === 'OPERATOR'}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecione...' />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {role === 'ADMIN' && (
                    <SelectItem value='ADMIN'>Admin</SelectItem>
                  )}
                  <SelectItem value='OPERATOR'>Operador</SelectItem>
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
