import { EmptyState } from '@/components/empty-state';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface TabDistributionProps {}

export function TabDistribution({}: TabDistributionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de Lucros</CardTitle>
        <CardDescription>
          Informações sobre a distribuição de lucros % para cada leitura
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <EmptyState label='Criar distribuição' />
      </CardContent>
    </Card>
  );
}
