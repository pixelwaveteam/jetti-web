import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';

import { fetchOrganizations } from '@/app/(in)/organizations/actions/fetch-organizations';
import { OrganizationDataTable } from '@/app/(in)/organizations/data-table';
import { fetchUserOrganizations } from '@/app/(in)/users/actions/fetch-user-organizations';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { PageContainer } from '@/components/page-container';

export const metadata: Metadata = {
  title: 'Organização',
  description: 'Administrar organizações parceiras.',
};

export default async function Organizations() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const { user } = session;

  const organizations = await fetchOrganizations();
  const userOrganizations = await fetchUserOrganizations(user.id);

  const allowedOrganizations = organizations.filter(({ id }) =>
    userOrganizations.some(({ organizationId }) => organizationId === id)
  );

  return (
    <PageContainer title='Organizações'>
      <OrganizationDataTable data={allowedOrganizations} />
    </PageContainer>
  );
}
