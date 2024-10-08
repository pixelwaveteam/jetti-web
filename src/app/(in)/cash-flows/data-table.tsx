'use client';

import { endOfWeek, startOfWeek } from 'date-fns';
import { useSession } from 'next-auth/react';
import { useContext, useMemo } from 'react';

import {
  CashFlowDataTableData,
  cashFlowColumns,
} from '@/app/(in)/cash-flows/columns';
import { CashFlowCreateSheet } from '@/app/(in)/cash-flows/create/create-sheet';
import { DataTable } from '@/components/data-table';
import { NewClosureContext } from '@/providers/new-closure-provider';
import { SheetProvider } from '@/providers/sheet-provider';
import { ClosureCreateSheet } from '../closure/create/create-sheet';

interface CashFlowDataTableProps {
  data: CashFlowDataTableData[];
  operators: string[];
  establishments: string[];
  userOrganizations: string[];
}

export function CashFlowDataTable({
  data,
  establishments,
  operators,
  userOrganizations
}: CashFlowDataTableProps) {
  const { data: session } = useSession();

  const isUserAdmin = session?.user.role === 'ADMIN';

  const { closureCashFlows } = useContext(NewClosureContext);

  const filteredData = useMemo(
    () =>
      closureCashFlows[0]
        ? data.filter(
            (entry) => entry.organization === closureCashFlows[0].organization
          )
        : data,
    [data, closureCashFlows]
  );

  const currentStartOfWeek = startOfWeek(new Date());
  const currentEndOfWeek = endOfWeek(new Date());

  const cashFlowColumnsFilted = isUserAdmin
    ? cashFlowColumns
    : cashFlowColumns.slice(0, -1);

  return (
    <DataTable
      columns={cashFlowColumnsFilted}
      data={filteredData}
      filterBy={[
        {
          key: 'code',
          label: 'código',
        },
        {
          key: 'terminal',
          label: 'código de terminal',
        },
        {
          key: 'establishment',
          label: 'locais',
          items: establishments,
        },
        {
          key: 'date',
          label: 'intervalo',
          isDate: true,
          defaultValue: { from: currentStartOfWeek, to: currentEndOfWeek },
        },
        {
          key: 'operator',
          label: 'operadores',
          items: operators,
        },
        {
          key: 'organization',
          label: 'organizações',
          items: userOrganizations,
        }
      ]}
      globalFiltering
      total
    >
      <div className='flex items-center gap-x-6'>
        {isUserAdmin && 
          <SheetProvider>
            <ClosureCreateSheet />
          </SheetProvider>
        }

        <SheetProvider>
          <CashFlowCreateSheet />
        </SheetProvider>
      </div>
    </DataTable>
  );
}
