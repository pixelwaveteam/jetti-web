'use client';

import { useSession } from 'next-auth/react';
import { useContext, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { NewClosureContext } from '@/providers/new-closure-provider';
import { useRouter } from 'next/navigation';
import { createClosure } from '../closure/actions/create-closure';

export function ClosureButton() {
  const { data: session } = useSession();
  const { closureCashFlows } = useContext(NewClosureContext);
  const { push } = useRouter()

  const isUserAdmin = session?.user.role === 'ADMIN';

  const { toast } = useToast()

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const closureCashFlowsTotal = closureCashFlows.length;

  if (closureCashFlowsTotal === 0 || !isUserAdmin) {
    return;
  }

  function handleModalClose() {
    setShowConfirmationModal(false);
  }

  async function handleSubmit() {
    try {
      const cashFlows = JSON.stringify(closureCashFlows.map(cashFlow => cashFlow.id));

      const closureCreated = await createClosure({cashFlows});

      handleModalClose();

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Fechamento criado com sucesso.',
        duration: 5000,
      })

      if(closureCreated) {
        push(`/closure/${closureCreated.id}`)
      }
    } catch(err) {
      console.error(err)

      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Favor tente novamente mais tarde.',
        duration: 5000,
      })
    }
  }

  return (
    <Dialog
      open={showConfirmationModal}
      onOpenChange={setShowConfirmationModal}
    >
      <DialogTrigger asChild>
        <Button variant='outline' className='flex gap-2' size='default'>
          <span className='hidden md:block'>Fechamento</span>
          <Badge>{closureCashFlowsTotal}</Badge>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='mt-4 space-y-4'>
          <DialogTitle>Confirmar fechamento</DialogTitle>
          <DialogDescription>
            <span>Deseja realmente criar um fechamento dessas leituras?</span>
          </DialogDescription>
        </DialogHeader>

        <div className='flex gap-x-6 w-full'>
          <Button type='submit' onClick={handleSubmit}>
            Sim
          </Button>
          <Button
            type='submit'
            variant='destructive'
            onClick={handleModalClose}
          >
            Não
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
