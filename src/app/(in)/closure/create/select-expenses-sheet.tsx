'use client';

import { useContext, useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { NewClosureContext } from '@/providers/new-closure-provider';
import { SheetContext } from '@/providers/sheet-provider';
import { convertCentsToCurrency } from '@/utils/currency';
import { PenBox, Trash } from 'lucide-react';
import { Expense } from '../../expenses/actions/fetch-expenses';

interface SelectExpensesSheetProps {
  onChange: (expenses: {
    id: string;
    name: string;
    amount: number, 
  }[]) => void;
  selectedExpenses: {
    id: string;
    name: string;
    amount: number, 
  }[];
}

export function SelectExpensesSheet({ onChange, selectedExpenses }: SelectExpensesSheetProps) {
  const { expenses } = useContext(NewClosureContext);

  const { show, setShow } = useContext(SheetContext);

  const notSelectedExpenses = useMemo(() => 
    expenses.filter(expense => 
      !selectedExpenses.find(selectedExpense => selectedExpense.id === expense.id)
    )
  , [expenses, selectedExpenses])

  function onSelect(expense: Expense) {
    onChange([expense, ...selectedExpenses])
  }

  function onRemove(expenseId: string) {
    const filteredSelectedExpenses = selectedExpenses
      .filter(selectedExpense => selectedExpense.id !== expenseId)

    onChange(filteredSelectedExpenses);
  }

  return (
    <Sheet open={show} onOpenChange={setShow}>
      <SheetTrigger asChild>
        <Button variant='outline' className='flex gap-2 w-full' size='default'>
          <span className='hidden md:block'>Editar Despesas</span>
          <PenBox />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Despesas do Fechamento</SheetTitle>
        </SheetHeader>

        {
          selectedExpenses.length > 0 && (
            <>
              <Label>Despesas Selecionadas</Label>

              <ul className='mt-4 flex gap-2 flex-col mb-6'>
                {selectedExpenses.map((expense) => (
                  <li key={expense.id}>
                    <Button
                      variant='outline'
                      size='lg'
                      className='w-full relative'
                      onClick={() => onRemove(expense.id)}
                    >
                      {expense.name} - {convertCentsToCurrency(expense.amount)}
                      <Trash className='absolute right-4 text-destructive' />
                    </Button>
                  </li>
                ))}
              </ul>
            </>
          )
        }

        <Label>Despesas</Label>
    
        {
          notSelectedExpenses.length > 0 ? (
            <ul className='flex gap-2 flex-col mt-4'>
              {notSelectedExpenses.map((expense) => (
                <li key={expense.id}>
                  <Button
                    variant='outline'
                    size='lg'
                    className='w-full'
                    onClick={() => onSelect(expense)}
                  >
                    {expense.name} - {convertCentsToCurrency(expense.amount)}
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-sm text-center text-muted-foreground mt-4'>Todas despesas selecionadas</p>
          )
        }

        <Button type='button' onClick={() => setShow(false)} className='w-full mt-4'>
          Concluir
        </Button>
      </SheetContent>
    </Sheet>
  );
}
