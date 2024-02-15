'use client';


import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

interface ConfirmClosureCreationModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function ConfirmClosureCreationModal({ isOpen, setIsOpen }: ConfirmClosureCreationModalProps) {
  function handleModalClose() {
    setIsOpen(false);
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='mt-4 space-y-4'>
          <DialogTitle>Confirmar fechamento</DialogTitle>
          <DialogDescription>
            <span>Deseja realmente criar um fechamento dessas leituras?</span>
          </DialogDescription>
        </DialogHeader>

        <div className='flex gap-x-6 w-full'>
          <Button type='submit' onClick={handleModalClose} form='createClosureForm'>
            Sim
          </Button>
          <Button
            type='button'
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
