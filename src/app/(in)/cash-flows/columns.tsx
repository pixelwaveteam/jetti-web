'use client';

import { ColumnDef } from '@/components/data-table';
import { ArrowUpDown, ChevronRight } from 'lucide-react';

import { AddCashFlowButton } from '@/app/(in)/cash-flows/add-cash-flow-button';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { NewClosureContext } from '@/providers/new-closure-provider';
import { convertCentsToCurrency } from '@/utils/currency';
import { getDateFormatted } from '@/utils/date';
import { isSameDay, isWithinInterval } from 'date-fns';
import Link from 'next/link';
import { useContext, useMemo } from 'react';
import { CashFlow } from './actions/fetch-cash-flows';

export type CashFlowDataTableData = CashFlow & {
  organization?: string;
  organizationId?: string;
  closed?: boolean;
  closureId?: string;
};

function SelectAllCashFlowsCheckbox({ cashFlows }: { cashFlows: CashFlowDataTableData[] }) {
  const { addNewCashFlows, removeCashFlows, closureCashFlows } =
    useContext(NewClosureContext);

  const isChecked = useMemo(() => cashFlows.every(cashFlow => 
    closureCashFlows.find(({ id }) => id === cashFlow.id)), 
    [closureCashFlows, cashFlows]
  )
  
  function onCheck() {
    if(isChecked) {
      const ids = cashFlows.map(({ id }) => id);

      removeCashFlows(ids);

      return;
    } 

    addNewCashFlows(cashFlows)
  }
  
  return (
    <Checkbox checked={isChecked} onCheckedChange={onCheck} />
  )
}

export const cashFlowColumns: ColumnDef<CashFlowDataTableData>[] = [
  {
    accessorKey: 'closure',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Fechamento
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cashFlow = row.original;

      return (
        <div className='flex flex-col gap-2 items-start'>
          <span>{cashFlow.closureId?.substring(0, 8)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'code',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          id
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cashFlow = row.original;

      return (
        <div className='flex flex-col gap-2 items-start'>
          <span>{cashFlow.code}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'organization',
    filterFn: (row, id, value) => {
      return value.length > 0 ? value.includes(row.original.organization) : true;
    },
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Organização
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'terminal',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Terminal
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cashFlow = row.original;

      return (
        <div className='flex flex-col gap-2 items-start'>
          <span>
            {cashFlow.terminal} - {cashFlow.registeredInterfaceName || ''}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'operator',
    filterFn: (row, id, value) => {
      return value.length > 0 ? value.includes(row.original.operator) : true;
    },
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Operador
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cashFlow = row.original;

      return (
        <div className='flex flex-col gap-2 items-start'>
          <span>{cashFlow.operator}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'establishment',
    filterFn: (row, id, value) => {
      return value.length > 0
        ? value.includes(row.original.registeredEstablishmentName)
        : true;
    },
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Local
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cashFlow = row.original;

      return (
        <div className='flex flex-col gap-2 items-start'>
          <span>{cashFlow.registeredEstablishmentName || '-'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'cashIn',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Entrada
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cashFlow = row.original;

      return (
        <div className='flex flex-col gap-2 items-start'>
          <span>{cashFlow.cashIn/100}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'cashOut',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Saída
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cashFlow = row.original;

      return (
        <div className='flex flex-col gap-2 items-start'>
          <span>{cashFlow.cashOut/100}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'gross',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Bruto
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cashFlow = row.original;

      return (
        <div className='flex flex-col gap-2 items-start'>
          <span>{convertCentsToCurrency(cashFlow.gross)}</span>
        </div>
      );
    },
    footer: (info) => {
      const total = info.table.getFilteredRowModel().rows.reduce((acc, row) => 
        Number(row.original.gross) + acc
      , 0)
      
      return <div>{convertCentsToCurrency(total)}</div>;
    }
  },
  {
    accessorKey: 'net',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Liquido
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cashFlow = row.original;

      console.log({cashFlow})

      return (
        <div className='flex flex-col gap-2 items-start'>
          <span>{convertCentsToCurrency(cashFlow.net)}</span>
        </div>
      );
    },
    footer: (info) => {
      const total = info.table.getFilteredRowModel().rows.reduce((acc, row) => 
        Number(row.original.net) + acc
      , 0)
      
      return <div>{convertCentsToCurrency(total)}</div>;
    }
  },
  {
    accessorKey: 'date',
    filterFn: (row, id, value) => {
      const splitDate = (row.getValue(id) as string)
        .slice(0, 10)
        .split('-')
        .map((part) => Number(part));

      const rowDate = new Date(splitDate[0], splitDate[1] - 1, splitDate[2]);

      if (!value.from) {
        return isSameDay(rowDate, value.to);
      }

      if (!value.to) {
        return isSameDay(rowDate, value.from);
      }

      return isWithinInterval(rowDate, { start: value.from, end: value.to });
    },
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Data
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const cashFlow = row.original;

      return (
        <div className='flex flex-col gap-2 items-start'>
          <span>{getDateFormatted(cashFlow.date)}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: (info) => {
      const cashFlows = info.table.getRowModel().rows.reduce((acc, row) => 
        [row.original, ...acc]
      , [] as CashFlowDataTableData[])

      return <SelectAllCashFlowsCheckbox cashFlows={cashFlows} />;
    },
    cell: ({ row }) => {
      const cashFlow = row.original;

      return (
        <div className='flex gap-x-3 justify-end'>
          <AddCashFlowButton cashFlow={cashFlow} />

          <Button variant={'ghost'} size={'icon'} asChild>
            <Link href={`/cash-flows/${cashFlow.id}`}>
              <ChevronRight className='h-4 w-4' />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
