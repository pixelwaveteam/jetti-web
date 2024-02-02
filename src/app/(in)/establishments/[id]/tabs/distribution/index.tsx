import { Plus } from 'lucide-react';

import { EstablishmentDistributionCreateSheet } from '@/app/(in)/establishments/[id]/tabs/distribution/create/create-sheet';
import { fetchEstablishmentDistributions } from '@/app/(in)/establishments/actions/fetch-establishment-distributions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SheetProvider } from '@/providers/sheet-provider';

import { CardContentEstablishmentDistribution } from '@/app/(in)/establishments/[id]/tabs/distribution/card-content';
import { Progress } from '@/components/ui/progress';
import { Establishment } from '../../../actions/fetch-establishments';

interface TabDistributionProps {
  establishment: Establishment;
}

export async function TabDistribution({ establishment }: TabDistributionProps) {
  const establishmentDistributions = await fetchEstablishmentDistributions(
    establishment.id
  );

  const totalPercentageOnDistribution =
    establishmentDistributions.reduce((acc, cur) => acc + cur.percentage, 0) /
    100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className='flex items-center justify-between'>
            <h3>Distribuição de Lucros</h3>
            <SheetProvider>
              <EstablishmentDistributionCreateSheet
                establishmentId={establishment.id}
              >
                <Button
                  variant='secondary'
                  className='flex gap-1'
                  size={'default'}
                >
                  <Plus size={16} />
                  <span className='hidden md:block'>Distributição</span>
                </Button>
              </EstablishmentDistributionCreateSheet>
            </SheetProvider>
          </div>
        </CardTitle>
        <CardDescription>
          Informações sobre a distribuição de lucros % para cada leitura
        </CardDescription>
        <div className='flex items-center'>
          <Progress
            value={totalPercentageOnDistribution}
            className='w-[16vw]'
          />
          <span className='ml-2 text-sm text-gray-300'>
            {totalPercentageOnDistribution}% parceiros /{' '}
            {100 - totalPercentageOnDistribution}% jetti
          </span>
        </div>
      </CardHeader>
      <CardContent className='space-y-4'>
        <CardContentEstablishmentDistribution
          establishmentId={establishment.id}
          establishmentDistributions={establishmentDistributions}
        />
      </CardContent>
    </Card>
  );
}
