'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode, cloneElement, useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DialogContext } from '@/providers/dialog-provider';

const CONFIRM_WORD = 'delete';

const ConfirmDeletionFormSchema = z.object({
  code: z
    .string()
    .min(1, 'Campo código é obrigatório.')
    .refine((value) => value.trim() === CONFIRM_WORD, {
      message: 'Código inválido. Digite "delete" para confirmar',
    }),
});

type ConfirmDeletionFormType = z.infer<typeof ConfirmDeletionFormSchema>;

interface ConfirmDeletionDialogProps {
  onConfirm: () => void;
  children: ReactNode;
}

export function ConfirmDeletionDialog({
  onConfirm,
  children,
}: ConfirmDeletionDialogProps) {
  const { show, setShow } = useContext(DialogContext);

  const formMethods = useForm<ConfirmDeletionFormType>({
    resolver: zodResolver(ConfirmDeletionFormSchema),
    defaultValues: {
      code: '',
    },
  });

  const { control, trigger, formState } = formMethods;

  const handleDelete = async () => {
    await trigger();

    if (formState.isValid) {
      onConfirm();
    }
  };

  const TriggerComponent = cloneElement(children as any, {
    onClick: () => setShow(true),
  });

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogTrigger asChild>{TriggerComponent}</DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <Form {...formMethods}>
          <form className='mt-4 space-y-4'>
            <DialogHeader>
              <DialogTitle>Confirmar exclusão</DialogTitle>
              <DialogDescription>
                {`Digite "${CONFIRM_WORD}" e clique em confirmar`}
              </DialogDescription>
            </DialogHeader>
            <FormField
              control={control}
              name='code'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Digite...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='button' onClick={handleDelete}>
              Confirmar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
