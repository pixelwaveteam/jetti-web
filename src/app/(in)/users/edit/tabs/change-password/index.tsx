import { changePassword } from "@/app/(in)/profile/actions/change-password";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { SheetContext } from "@/providers/sheet-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const UserPasswordFormEditSchema = z
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
  })

type UserPasswordFormEditSchemaType = z.infer<typeof UserPasswordFormEditSchema>;

export function UserPasswordFormEdit() {
  const formMethods = useForm<UserPasswordFormEditSchemaType>({
    resolver: zodResolver(UserPasswordFormEditSchema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  });

  const { handleSubmit, control, formState } = formMethods

  const { toast } = useToast();
  const { setShow } = useContext(SheetContext);

  async function onSubmit(data: UserPasswordFormEditSchemaType) {
    try {
      await changePassword(data)

      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Senha alterada com sucesso.',
        duration: 5000,
      })
    } catch {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Favor tente novamente mais tarde.',
        duration: 5000,
      });
    }
  }

  return (
    <div className='space-y-6'>
      <Form {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
          <FormField
            control={control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nova senha</FormLabel>
                <FormControl>
                  <Input placeholder='Nova senha do usuário' {...field} />
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
                <FormLabel>Confirme a senha</FormLabel>
                <FormControl>
                  <Input placeholder='Confirmação da senha' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
        </form>
      </Form>
    </div>
  )
}