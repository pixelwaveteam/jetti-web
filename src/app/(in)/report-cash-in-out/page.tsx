import { Metadata } from 'next';

import { fetchCashFlows } from '@/app/(in)/cash-flows/actions/fetch-cash-flows';
import { Terminal, fetchTerminals } from '@/app/(in)/terminals/actions/fetch-terminals';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { PageContainer } from '@/components/page-container';
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
import { ReportCashInOutDataTableData } from './columns';
import { CashFlowDataTable } from './data-table';

export const metadata: Metadata = {
  title: 'Leituras',
  description: 'Administrar leituras dos terminais.',
};

export default async function ReportCashInOut() {
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
    && session?.user.organizationsId.includes(organizationId)
  })
  
  const establishmentsName = establishments
    .map(({ name }) => name)
    .filter((value, index, self) => self.indexOf(value) === index);

  const cashFlows = [];

  for(const rawCashFlow of rawCashFlows) {
    let cashFlow: ReportCashInOutDataTableData = { ...rawCashFlow };

    const cashFlowsTerminal = rawTerminals.find(({ code }) => String(code) === rawCashFlow.terminal)

    const cashFlowEstablishmentId = cashFlowsTerminal?.establishmentId

    if(cashFlowEstablishmentId) {
      const establishment = await fetchEstablishment(cashFlowEstablishmentId)

      if(userOrganizations.find(({ organizationId }) => organizationId === establishment.organizationId)) {
        const cashFlowOrganizationId = establishments.find(({ id }) => id === cashFlowEstablishmentId)?.organizationId
  
        const cashFlowOrganizationName = cashFlowOrganizationId && organizations.find(({ id }) => id === cashFlowOrganizationId)?.name
  
        if(cashFlowOrganizationName) {
          if(!session?.user.organizationsId.includes(cashFlowOrganizationId)) {
            continue
          }
  
          cashFlow.organization = cashFlowOrganizationName;
        }
      }
    }

    cashFlows.push(cashFlow)
  }
  const userOrganizationNames = userOrganizations.reduce((acc, { organizationId }) => {
    const organizationName = organizations.find(organization => organization.id === organizationId)?.name;
    if(organizationName) return [...acc, organizationName]; 
    return acc
  }, [] as string[]).filter((value, index, self) => self.indexOf(value) === index)
  
  return (
    <PageContainer title='Relatório Entradas/Saídas'>
      <CashFlowDataTable data={cashFlows} establishments={establishmentsName} userOrganizations={userOrganizationNames} />
    </PageContainer>
  );
}
