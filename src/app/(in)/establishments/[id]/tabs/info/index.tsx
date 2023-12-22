import { EmptyState } from '@/components/empty-state';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface TabInfoProps {}

export function TabInfo({}: TabInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações gerais</CardTitle>
        <CardDescription>
          Informações gerais sobre o local como endereço e contatos
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <EmptyState label='Criar endereço' />
        <EmptyState label='Criar contato' />
      </CardContent>
    </Card>
  );
}
