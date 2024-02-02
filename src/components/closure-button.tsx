'use client'

import { NewClosureContext } from "@/providers/new-closure-provider";
import { useContext, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

export function ClosureButton() {
  const { closureCashFlows } = useContext(NewClosureContext);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false)

  const closureCashFlowsTotal = closureCashFlows.length;

  if(closureCashFlowsTotal === 0) {
    return; 
  }
  
  function handleModalClose() {
    setShowConfirmationModal(false)
  }

  function handleSubmit() {

  }

  return (
      <Dialog open={showConfirmationModal} onOpenChange={setShowConfirmationModal}>
      <DialogTrigger asChild>
        <Button variant='outline' className='flex gap-2' size='default'>
          <span className='hidden md:block'>Fechamento</span>
          <Badge>{closureCashFlowsTotal}</Badge>
        </Button>  
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='mt-4 space-y-4'>
          <DialogTitle>Confirmar exclusão</DialogTitle>
          <DialogDescription>
            <span>
              Deseja realmente criar um fechamento dessas leituras?
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-x-6 w-full">
          <Button type='submit' onClick={handleSubmit}>
            Sim
          </Button>
          <Button type='submit' variant='destructive' onClick={handleModalClose}>
            Não
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}