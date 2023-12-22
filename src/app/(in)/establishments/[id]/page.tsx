import { Metadata } from 'next';

import { TabDistribution } from '@/app/(in)/establishments/[id]/tabs/distribution';
import { TabInfo } from '@/app/(in)/establishments/[id]/tabs/info';
import { fetchEstablishment } from '@/app/(in)/establishments/actions/fetch-establishment';
import { EstablishmentEditSheet } from '@/app/(in)/establishments/edit/edit-sheet';
import { fetchOrganizations } from '@/app/(in)/organizations/actions/fetch-organizations';
import { PageContainer } from '@/components/page-container';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EstablishmentProvider } from '@/providers/establishment-provider';
import { SheetProvider } from '@/providers/sheet-provider';

export const metadata: Metadata = {
  title: 'Locais',
  description: 'Locais onde estão localizados os terminais.',
};

interface EstablishmentProps {
  params: {
    id: string;
  };
}

export default async function Establishment({
  params: { id },
}: EstablishmentProps) {
  const establishment = await fetchEstablishment(id);
  const organizations = await fetchOrganizations();

  const organization = organizations.find(
    (org) => org.id === establishment.organizationId
  );

  const renderEditOrganizationButton = (
    <SheetProvider>
      <EstablishmentEditSheet establishment={establishment} />
    </SheetProvider>
  );

  return (
    <EstablishmentProvider initialData={{ organizations }}>
      <PageContainer
        title={establishment.name}
        description={organization?.name}
        action={renderEditOrganizationButton}
        goBackUrl={'/establishments'}
      >
        <Tabs defaultValue='info' className='w-full'>
          <TabsList>
            <TabsTrigger value='info'>Informações</TabsTrigger>
            <TabsTrigger value='distribution'>
              Distribuição de Lucros
            </TabsTrigger>
          </TabsList>
          <TabsContent value='info'>
            <TabInfo />
          </TabsContent>
          <TabsContent value='distribution'>
            <TabDistribution />
          </TabsContent>
        </Tabs>
      </PageContainer>
    </EstablishmentProvider>
  );
}
