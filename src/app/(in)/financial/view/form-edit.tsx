'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

const FinancialFormEditSchema = z.object({
  name: z.string(),
});

interface Financial {
  id: string;
  name: string;
}

type FinancialFormEditType = z.infer<typeof FinancialFormEditSchema>;

interface FinancialFormEditProps {
  financial: Financial;
}

export function FinancialFormEdit({ financial }: FinancialFormEditProps) {
  const formMethods = useForm<FinancialFormEditType>({
    resolver: zodResolver(FinancialFormEditSchema),
    defaultValues: {
      name: financial.name,
    },
  });

  const { handleSubmit } = formMethods;

  const onSubmit = async (data: FinancialFormEditType) => {};

  const handleDeleteFinancial = async () => {};

  return (
    <div className='space-y-6'>
      <Form {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
          <div className='flex gap-2'>
            <Button type='submit' className='w-full'>
              Alterar
            </Button>
            <Button
              type='button'
              variant='destructive'
              className='w-full'
              onClick={handleDeleteFinancial}
            >
              Excluir
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
