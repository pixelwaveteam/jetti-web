'use client'

import { ConfirmDeletionDialog } from "@/components/confirm-deletion-dialog";
import { DialogProvider } from "@/providers/dialog-provider";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Minus } from "lucide-react";
import { deleteClosureDistribution } from "../actions/delete-closure-distribution";

interface DeleteClosureDistributionDialogProps {
  id: string;
}

export function DeleteClosureDistributionDialog({ id }: DeleteClosureDistributionDialogProps) {
  const { toast } = useToast();

  const handleDeleteInterface = async () => {
    try {

      await deleteClosureDistribution(id);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Distribuição do fechamento excluída com sucesso.',
        duration: 5000,
      });
    } catch(err) {
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
        <Button variant={'ghost'} size={'icon'}>
          <Minus className='h-4 w-4 text-destructive' />
        </Button>
      </ConfirmDeletionDialog>
    </DialogProvider>
  )
}