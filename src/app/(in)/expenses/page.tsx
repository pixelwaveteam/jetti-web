import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';

import { fetchExpenses } from '@/app/(in)/expenses/actions/fetch-expenses';
import { ExpenseDataTable } from '@/app/(in)/expenses/data-table';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { PageContainer } from '@/components/page-container';

export const metadata: Metadata = {
  title: 'Despesa',
  description: 'Administrar despesas parceiras.',
};

export default async function Expenses() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const expenses = await fetchExpenses();

  return (
    <PageContainer title='Despesas'>
      <ExpenseDataTable data={expenses} />
    </PageContainer>
  );
}
