'use client';

import { useContext } from 'react';

import { Establishment } from '@/app/(in)/establishments/actions/fetch-establishments';
import { Button } from '@/components/ui/button';
import { CashFlowContext } from '@/providers/cash-flow-provider';
import { SheetContext } from '@/providers/sheet-provider';

export function SelectEstablishment() {
  const { establishments, selectEstablishment } = useContext(CashFlowContext);
  const { show } = useContext(SheetContext);

  const handleSelectEstablishment = (establishment: Establishment) => () => {
    selectEstablishment(establishment);
  };

  if (!show) {
    selectEstablishment(null);
  }

  if (establishments.length === 0) {
    return <h2>Não há estabelecimentos disponíveis</h2>;
  }

  return (
    <>
      <h2>Selecione um estabelecimento</h2>
      <ul className='mt-4 flex gap-2 flex-col'>
        {establishments.map((establishment) => (
          <li key={establishment.id}>
            <Button
              variant='outline'
              size='lg'
              className='w-full'
              onClick={handleSelectEstablishment(establishment)}
            >
              {establishment.name}
            </Button>
          </li>
        ))}
      </ul>
    </>
  );
}
