'use client';

import { useSession } from 'next-auth/react';

import { DataTable } from '@/components/data-table';
import { subMonths } from 'date-fns';
import { cashFlowColumns, ReportCashInOutDataTableData } from './columns';

interface ReportCashInOuDataTableProps {
  data: ReportCashInOutDataTableData[];
  establishments: string[];
  userOrganizations: string[];
}

export function CashFlowDataTable({
  data,
  establishments,
  userOrganizations
}: ReportCashInOuDataTableProps) {
  const { data: session } = useSession();

  const isUserAdmin = session?.user.role === 'ADMIN';

  const currentStartOfTrimester = subMonths(new Date(), 3);
  const currentEndOfTrimester = new Date();

  const cashFlowColumnsFilted = isUserAdmin
    ? cashFlowColumns
    : cashFlowColumns.slice(0, -1);

  return (
    <DataTable
      columns={cashFlowColumnsFilted}
      data={data}
      filterBy={[
        {
          key: 'establishment',
          label: 'locais',
          items: establishments,
        },
        {
          key: 'date',
          label: 'intervalo',
          isDate: true,
          defaultValue: { from: currentStartOfTrimester, to: currentEndOfTrimester },
        },
        {
          key: 'terminal',
          label: 'código de terminal',
        },
        {
          key: 'organization',
          label: 'organizações',
          items: userOrganizations,
        }
      ]}
      globalFiltering
    />
  );
}
