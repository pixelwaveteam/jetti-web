import { LucideIcon } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/style';

interface CardStatProps {
  title: string;
  highlight: string;
  description?: string;
  icon: LucideIcon;
  iconColor?:
    | 'text-indigo-400'
    | 'text-red-400'
    | 'text-yellow-400'
    | 'text-green-400'
    | 'text-green-600'
    | 'text-blue-400'
}

export function CardStat({
  title,
  highlight,
  icon,
  iconColor = 'text-indigo-400',
  description,
}: CardStatProps) {
  const Icon = icon;

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <Icon className={cn('h-4 w-4', iconColor)} />
      </CardHeader>
      <CardContent>
        <div className='text-2xl font-bold'>{highlight}</div>
        {description && (
          <p className='text-xs text-muted-foreground'>{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
