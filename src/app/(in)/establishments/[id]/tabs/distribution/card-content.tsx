import { EstablishmentDistributionCreateSheet } from '@/app/(in)/establishments/[id]/tabs/distribution/create/create-sheet';
import { EstablishmentDistributionDataTable } from '@/app/(in)/establishments/[id]/tabs/distribution/data-table';
import { EmptyState } from '@/components/empty-state';
import { SheetProvider } from '@/providers/sheet-provider';
import { EstablishmentDistributionData } from './columns';

interface CardContentEstablishmentDistributionProps {
  establishmentId: string;
  establishmentDistributions?: EstablishmentDistributionData[];
}

export function CardContentEstablishmentDistribution({
  establishmentId,
  establishmentDistributions,
}: CardContentEstablishmentDistributionProps) {
  if (!establishmentDistributions || establishmentDistributions.length === 0) {
    return (
      <SheetProvider>
        <EstablishmentDistributionCreateSheet establishmentId={establishmentId}>
          <EmptyState label='Criar distribuição' />
        </EstablishmentDistributionCreateSheet>
      </SheetProvider>
    );
  }

  return (
    <EstablishmentDistributionDataTable data={establishmentDistributions} />
  );
}
