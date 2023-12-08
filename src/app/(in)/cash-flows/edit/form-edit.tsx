'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { CashFlow } from '@/app/(in)/cash-flows/columns';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

const CashFlowFormEditSchema = z.object({
  name: z.string(),
});

type CashFlowFormEditType = z.infer<typeof CashFlowFormEditSchema>;

interface CashFlowFormEditProps {
  cashFlow: CashFlow;
}

export function CashFlowFormEdit({ cashFlow }: CashFlowFormEditProps) {
  const formMethods = useForm<CashFlowFormEditType>({
    resolver: zodResolver(CashFlowFormEditSchema),
    defaultValues: {
      name: cashFlow.name,
    },
  });

  const { handleSubmit } = formMethods;

  const onSubmit = async (data: CashFlowFormEditType) => {};

  const handleDeleteCashFlow = async () => {};

  return (
    <div className='space-y-6'>
      <Form {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
          <div className='flex gap-2'>
            <Button type='submit' className='w-full'>
              Save
            </Button>
            <Button
              type='button'
              variant='destructive'
              className='w-full'
              onClick={handleDeleteCashFlow}
            >
              Delete
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
