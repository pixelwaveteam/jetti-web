import { Metadata } from 'next';

import { fetchCashFlows } from '@/app/(in)/cash-flows/actions/fetch-cash-flows';
import { CashFlowDataTable } from '@/app/(in)/cash-flows/data-table';
import { Terminal, fetchTerminals } from '@/app/(in)/terminals/actions/fetch-terminals';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { PageContainer } from '@/components/page-container';
import { CashFlowProvider } from '@/providers/cash-flow-provider';
import { NewClosureProvider } from '@/providers/new-closure-provider';
import { getServerSession } from 'next-auth';
import { fetchAllClosureCashFlows } from '../closure/actions/fetch-all-closure-cash-flows';
import { fetchAllClosuresExpenses } from '../closure/actions/fetch-all-closures-expenses';
import { fetchEstablishment } from '../establishments/actions/fetch-establishment';
import { fetchEstablishments } from '../establishments/actions/fetch-establishments';
import { fetchExpenses } from '../expenses/actions/fetch-expenses';
import { fetchInterface } from '../interfaces/actions/fetch-interface';
import { fetchOrganizationsExpenses } from '../organizations-expenses/actions/fetch-organizations-expenses';
import { fetchOrganizations } from '../organizations/actions/fetch-organizations';
import { fetchUserOrganizations } from '../users/actions/fetch-user-organizations';
import { fetchUsers } from '../users/actions/fetch-users';
import { CashFlowDataTableData } from './columns';

export const metadata: Metadata = {
  title: 'Leituras',
  description: 'Administrar leituras dos terminais.',
};

export default async function CashFlows() {
  const session = await getServerSession(authOptions);

  const [rawCashFlows, rawTerminals, rawEstablishments, organizations, users, closuresCashFlows, rawExpenses, organizationsExpenses, userOrganizations, closuresExpenses] = await Promise.all([
    fetchCashFlows(),
    fetchTerminals(),
    fetchEstablishments(),
    fetchOrganizations(),
    fetchUsers(),
    fetchAllClosureCashFlows(),
    fetchExpenses(),
    fetchOrganizationsExpenses(),
    session?.user.id ? fetchUserOrganizations(session.user.id) : [],
    fetchAllClosuresExpenses(),
  ]); 

  const operators = users.map(({ name }) => name);

  const establishmentsName = rawEstablishments
    .map(({ name }) => name)
    .filter((value, index, self) => self.indexOf(value) === index);

  const cashFlows = []

  for(const rawCashFlow of rawCashFlows) {
    let cashFlow: CashFlowDataTableData = { ...rawCashFlow };

    const cashFlowsTerminal = rawTerminals.find(({ code }) => String(code) === rawCashFlow.terminal)

    const cashFlowEstablishmentId = cashFlowsTerminal?.establishmentId

    if(cashFlowEstablishmentId) {
      const { name: establishmentName, ...establishment } = await fetchEstablishment(cashFlowEstablishmentId)

      if(userOrganizations.find(({ organizationId }) => organizationId === establishment.organizationId)) {
        cashFlow.establishment = establishmentName
  
        const cashFlowOrganizationId = rawEstablishments.find(({ id }) => id === cashFlowEstablishmentId)?.organizationId
  
        const cashFlowOrganizationName = cashFlowOrganizationId && organizations.find(({ id }) => id === cashFlowOrganizationId)?.name
  
        if(cashFlowOrganizationName) {
          if(!session?.user.organizationsId.includes(cashFlowOrganizationId)) {
            continue
          }
  
          cashFlow.organization = cashFlowOrganizationName;
          cashFlow.organizationId = cashFlowOrganizationId;
        }
      }
    }

    const terminalsInterfaceId = cashFlowsTerminal?.interfaceId

    const terminalsInterface = terminalsInterfaceId && await fetchInterface(terminalsInterfaceId)

    if(terminalsInterface) {
      cashFlow.interface = terminalsInterface.name;
    }

    const closureCashFlow = closuresCashFlows.find(closure => closure.cashFlowId === rawCashFlow.id)

    closureCashFlow?.closureId

    if(closureCashFlow) {
      cashFlow.closureId = closureCashFlow.closureId;
      cashFlow.closed = true;
    }

    cashFlows.push(cashFlow)
  }

  const terminals = [];

  for(const rawTerminal of rawTerminals) {
    const terminal = rawTerminal as (Terminal & {
      interfaceName?: string;
    })

    const fetchedInterface = await fetchInterface(rawTerminal.interfaceId);

    if(fetchedInterface) {
      terminal.interfaceName = fetchedInterface.name
    }

    terminals.push(terminal)
  }

  const terminalEstablishments = terminals
      .map((terminal) => terminal.establishmentId)
      .filter((value, index, self) => self.indexOf(value) === index);

  const establishments = rawEstablishments.filter(({ id, isActive, isWarehouse, organizationId }) => {
    return terminalEstablishments.includes(id) 
      && isActive 
      && !isWarehouse 
      && session?.user.organizationsId.includes(organizationId)
  })

  const expenses = []

  for(const organizationExpense of organizationsExpenses) {
    const expense = organizationExpense;

    const rawExpense = rawExpenses.find(({ id }) => organizationExpense.expenseId === id)

    if(rawExpense) {
      expenses.push({ ...expense, ...rawExpense });
    }
  }

  return (
    <PageContainer title='Leituras'>
      <CashFlowProvider initialData={{ terminals, establishments }}>
        <NewClosureProvider initialData={{ expenses, closuresExpenses }}>
          <CashFlowDataTable data={cashFlows} establishments={establishmentsName} operators={operators} />
        </NewClosureProvider>
      </CashFlowProvider>
    </PageContainer>
  );
}
