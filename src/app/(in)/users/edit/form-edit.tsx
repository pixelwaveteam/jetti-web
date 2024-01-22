'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { deleteUser } from '@/app/(in)/users/actions/delete-user';
import { updateUser } from '@/app/(in)/users/actions/update-user';
import { User } from '@/app/(in)/users/columns';
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
import { useToast } from '@/hooks/use-toast';
import { DialogProvider } from '@/providers/dialog-provider';
import { SheetContext } from '@/providers/sheet-provider';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

const UserFormEditSchema = z.object({
  name: z
    .string({ required_error: 'Nome não pode ser vazio.' })
    .min(6, 'Nome deve ter pelo menos 3 caractere.')
    .max(50, 'Nome deve ter no máximo 50 caracteres.'),
  email: z.string().email('Email inválido.'),
  role: z
    .enum(['ADMIN', 'OPERATOR'] as const)
    .refine((value) => value === 'ADMIN' || value === 'OPERATOR', {
      message: 'Permissão inválida.',
    }),
});

type UserFormEditType = z.infer<typeof UserFormEditSchema>;

interface UserFormEditProps {
  user: User;
}

export function UserFormEdit({ user }: UserFormEditProps) {
  const { toast } = useToast();
  const { setShow } = useContext(SheetContext);
  const { data: session } = useSession();

  const role = session?.user?.role || 'OPERATOR';

  const formMethods = useForm<UserFormEditType>({
    resolver: zodResolver(UserFormEditSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  const { handleSubmit, control, formState } = formMethods;

  const onSubmit = async (data: UserFormEditType) => {
    try {
      await updateUser({
        id: user.id,
        data,
      });

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Usuário alterado com sucesso.',
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

  const handleDeleteUser = async () => {
    try {
      await deleteUser(user.id);

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Usuário excluida com sucesso.',
        duration: 5000,
      });
    } catch(err) {
      if(err instanceof Error && err.message === "User has dependents.") {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: 'Esse usuário tem registros associados à ele. Para exclui-lo, exclua suas associações antes!',
          duration: 7000,
        });

        setShow(false);

        return
      }

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
                  disabled={
                    role === 'OPERATOR' || user.id === session?.user?.id
                  }
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

                {user.id === session?.user?.id && (
                  <FormDescription>
                    Não é possível alterar a permissão do próprio usuário.
                  </FormDescription>
                )}

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
            <DialogProvider>
              <ConfirmDeletionDialog onConfirm={handleDeleteUser}>
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
