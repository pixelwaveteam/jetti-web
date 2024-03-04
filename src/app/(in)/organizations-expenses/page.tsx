import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';

import { fetchExpenses } from '@/app/(in)/expenses/actions/fetch-expenses';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { PageContainer } from '@/components/page-container';
import { OrganizationExpenseProvider } from '@/providers/expense-provider';
import { fetchOrganizations } from '../organizations/actions/fetch-organizations';
import { fetchOrganizationsExpenses } from './actions/fetch-organizations-expenses';
import { OrganizationExpenseDataTableData } from './columns';
import { OrganizationExpenseDataTable } from './data-table';

export const metadata: Metadata = {
  title: 'Despesas das Organizações',
  description: 'Administrar despesas das organizações parceiras.',
};

export default async function OrganizationsExpenses() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const expenses = await fetchExpenses();

  const organizations = await fetchOrganizations();
  
  const rawOrganizationsExpenses = await fetchOrganizationsExpenses();

  const organizationsExpenses: OrganizationExpenseDataTableData[] = []

  for(const rawOrganizationExpense of rawOrganizationsExpenses) {
    if(!session?.user.organizationsId.includes(rawOrganizationExpense.organizationId)) {
      continue
    }

    const organizationExpense: OrganizationExpenseDataTableData = rawOrganizationExpense

    const expense = expenses.find(({ id }) => id === rawOrganizationExpense.expenseId)

    if(expense) {
      organizationExpense.name = expense.name
    }

    const organization = organizations.find(({ id }) => id === rawOrganizationExpense.organizationId)

    if(organization) {
      organizationExpense.organizationName = organization.name
    }

    organizationsExpenses.push(organizationExpense)
  }

  console.log({organizationsExpenses})

  return (
    <PageContainer title='Despesas das Organizações'>
      <OrganizationExpenseProvider initialData={{ organizations, expenses }}>
        <OrganizationExpenseDataTable data={organizationsExpenses} />
      </OrganizationExpenseProvider>
    </PageContainer>
  );
}
