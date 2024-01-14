'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { updateUser } from '@/app/(in)/users/actions/update-user';
import { User } from '@/app/(in)/users/columns';
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
import { useToast } from '@/hooks/use-toast';
import { SheetContext } from '@/providers/sheet-provider';

const ProfileFormEditSchema = z.object({
  name: z
    .string({ required_error: 'Nome não pode ser vazio.' })
    .min(3, 'Nome deve ter pelo menos 3 caractere.')
    .max(50, 'Nome deve ter no máximo 50 caracteres.'),
  email: z.string().email('Email inválido.'),
  role: z
    .enum(['ADMIN', 'OPERATOR'] as const)
    .refine((value) => value === 'ADMIN' || value === 'OPERATOR', {
      message: 'Permissão inválida.',
    }),
});

type ProfileFormEditType = z.infer<typeof ProfileFormEditSchema>;

interface ProfileFormEditProps {
  user: User;
}

export function ProfileFormEdit({ user }: ProfileFormEditProps) {
  const { toast } = useToast();
  const { setShow } = useContext(SheetContext);
  const { data: session, update } = useSession();

  const formMethods = useForm<ProfileFormEditType>({
    resolver: zodResolver(ProfileFormEditSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  const { handleSubmit, control, formState } = formMethods;

  const onSubmit = async (data: ProfileFormEditType) => {
    try {
      if (!session) {
        return null;
      }

      await updateUser({
        id: user.id,
        data,
      });

      update({
        ...session,
        user: {
          ...session.user,
          name: data.name,
        },
      });

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Perfil alterado com sucesso.',
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
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Email do usuário' {...field} />
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
                  defaultValue={field.value}
                  disabled
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecione...' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='ADMIN'>Admin</SelectItem>
                    <SelectItem value='OPERATOR'>Operador</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Não é possível alterar a permissão do próprio usuário.
                </FormDescription>
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
