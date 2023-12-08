'use client';

import { organizationColumns } from '@/app/(in)/organizations/columns';
import { OrganizationCreateDrawer } from '@/app/(in)/organizations/create/create-drawer';
import { DataTable } from '@/components/data-table';
import { SheetProvider } from '@/providers/sheet-provider';
import { useQuery } from '@tanstack/react-query';

export function OrganizationDataTable() {
  const { data, isLoading } = useQuery<any>({
    queryKey: ['organizations'],
    queryFn: () => fetch('/api/organizations').then((res) => res.json()),
  });

  return (
    <DataTable
      columns={organizationColumns}
      data={data}
      filterBy={{
        key: 'name',
        label: 'nome',
      }}
    >
      <SheetProvider>
        <OrganizationCreateDrawer />
      </SheetProvider>
    </DataTable>
  );
}
