import { Calendar, DollarSign, User } from 'lucide-react';
import { Metadata } from 'next';

import { PageContainer } from '@/components/page-container';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getDateFormatted } from '@/utils/date';

import { ClosureProvider } from '@/providers/closure-provider';
import { fetchCashFlow } from '../../cash-flows/actions/fetch-cash-flow';
import { fetchEstablishment } from '../../establishments/actions/fetch-establishment';
import { fetchExpense } from '../../expenses/actions/fetch-expense';
import { Expense } from '../../expenses/actions/fetch-expenses';
import { fetchOrganizationExpense } from '../../organizations-expenses/actions/fetch-organization-expense';
import { OrganizationExpense } from '../../organizations-expenses/actions/fetch-organizations-expenses';
import { fetchTerminal } from '../../terminals/actions/fetch-terminal';
import { fetchUser } from '../../users/actions/fetch-user';
import { fetchClosure } from '../actions/fetch-closure';
import { fetchClosureCashFlows } from '../actions/fetch-closure-cash-flows';
import { fetchClosureDistributions } from '../actions/fetch-closure-distribution';
import { fetchClosureExpenses } from '../actions/fetch-closure-expenses';
import { ClosuresCashFlowsTable } from './closure-cash-flows-data-table';
import { ClosuresExpensesTable } from './closure-expenses-data-table';
import { DeleteClosureDialog } from './delete-closure-dialog';
import { ListDistribution } from './list-distribution';
import { ClosureStats } from './stats';

export const metadata: Metadata = {
  title: 'Leitura',
  description: 'Leitura de terminal.',
};

interface ClosureProps {
  params: {
    id: string;
  };
}

export default async function Closure({ params: { id } }: ClosureProps) {
  const {  net, gross, closerId, createdAt, organizationId } = await fetchClosure(id);

  const closureDistribution = await fetchClosureDistributions(id);

  const closer = await fetchUser(closerId);

  const closureCashFlows = await fetchClosureCashFlows(id);

  const closureCashFlowsTotal = closureCashFlows.length

  const cashFlows = []

  for(const closureCashFlow of closureCashFlows) {
    const rawCashFlow = await fetchCashFlow(closureCashFlow.cashFlowId);

    const terminal = await fetchTerminal(rawCashFlow.terminalId)

    const establishment = await fetchEstablishment(terminal.establishmentId);

    const cashFlow = {
      ...rawCashFlow,
      establishmentName: establishment.name,
    }

    cashFlows.push(cashFlow)
  }

  

  const closureExpenses = await fetchClosureExpenses(id);

  const expenses = []

  for(const closureExpense of closureExpenses) {
    let newExpense: Expense & OrganizationExpense = {} as Expense & OrganizationExpense;

    try {
      const expense = await fetchExpense(closureExpense.expenseId);

      newExpense = {...newExpense, ...expense}
    } catch {}

    try {
      const organizationExpense = await fetchOrganizationExpense(organizationId, closureExpense.expenseId)

      newExpense = {...newExpense, ...organizationExpense}
    } catch {}


    expenses.push(newExpense)
  }

  const expensesTotal = expenses.reduce((acc, expense) => acc + expense.amount, 0)

  const renderDeleteClosureButton = (
    <DeleteClosureDialog />
  )

  const statValues = {
    cashFlowsTotal: closureCashFlowsTotal,
    gross: gross/2,
    net,
  };

  const renderDescription = (
    <div className='flex flex-col gap-1 md:flex-row md:gap-4'>
      <div className='flex gap-1 items-center'>
        <DollarSign size={16} />
        <span>{id}</span>
      </div>
      <div className='flex gap-1 items-center'>
        <User size={16} />
        <span>{closer.name}</span>
      </div>
      <div className='flex gap-1 items-center'>
        <Calendar size={16} />
        <span>{getDateFormatted(createdAt)}</span>
      </div>
    </div>
  );

  return (
    <ClosureProvider initialData={{ }}>
      <PageContainer
        title={`Fechamento`}
        description={renderDescription}
        goBackUrl={'/closure'}
        action={renderDeleteClosureButton}
      >
        <ClosureStats statValues={statValues} />
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
          <Card className='col-span-1'>
            <CardHeader>
              <CardTitle>Leituras</CardTitle>
            </CardHeader>
            <CardContent className='pl-2'>
              <ClosuresCashFlowsTable closuresCashFlows={cashFlows} />
            </CardContent>
          </Card>
          <Card className='col-span-1'>
            <CardHeader>
              <CardTitle>Despesas</CardTitle>
            </CardHeader>
            <CardContent className='pl-2'>
              <ClosuresExpensesTable closuresExpenses={expenses} />
            </CardContent>
          </Card>
          <Card className='col-span-1'>
            <CardHeader>
              <CardTitle>Distribuição de Ganhos</CardTitle>
              <CardDescription>
                Ganhos divididos em {closureDistribution.length} parte(s).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ListDistribution netDistributions={closureDistribution} />
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </ClosureProvider>
  );
}
