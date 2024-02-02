'use client'

import { NewClosureContext } from "@/providers/new-closure-provider";
import { useContext } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function ClosureButton() {
  const { closureCashFlows } = useContext(NewClosureContext)

  const closureCashFlowsTotal = closureCashFlows.length;

  if(closureCashFlowsTotal === 0) {
    return; 
  }
  
  return (
    <Button variant='outline' className='flex gap-2' size='default'>
      <span className='hidden md:block'>Fechamento</span>
      <Badge>{closureCashFlowsTotal}</Badge>
    </Button>
  )
}