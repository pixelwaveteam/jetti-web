import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface CardStatProps {
  title: string;
  highlight: string;
  description: string;
  icon: LucideIcon;
}

export function CardStat({
  title,
  highlight,
  icon,
  description,
}: CardStatProps) {
  const Icon = icon;

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <Icon className='h-4 w-4 text-indigo-400' />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{highlight}</div>
        <p className='text-xs text-muted-foreground'>{description}</p>
      </CardContent>
    </Card>
  );
}
