'use client'

import { ConfirmDeletionDialog } from "@/components/confirm-deletion-dialog";
import { DialogProvider } from "@/providers/dialog-provider";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
import { deleteClosure } from "../actions/delete-closure";

export function DeleteClosureDialog() {
  const { id } = useParams<{ id: string }>()

  const { toast } = useToast();

  const { push } = useRouter()

  const handleDeleteInterface = async () => {
    try {
      console.log({id})

      await deleteClosure(id);

      push('/closure')

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Fechamento excluído com sucesso.',
        duration: 5000,
      });
    } catch(err) {
      console.log({err})

      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Favor tente novamente mais tarde.',
        duration: 5000,
      });
    }
  };


  return (
    <DialogProvider>
      <ConfirmDeletionDialog onConfirm={handleDeleteInterface}>
        <Button type='button' variant='destructive' className='w-full'>
          Excluir
        </Button>
      </ConfirmDeletionDialog>
    </DialogProvider>
  )
}