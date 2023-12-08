'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Establishment } from '@/app/(in)/establishments/columns';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

const EstablishmentFormEditSchema = z.object({
  name: z.string(),
});

type EstablishmentFormEditType = z.infer<typeof EstablishmentFormEditSchema>;

interface EstablishmentFormEditProps {
  establishment: Establishment;
}

export function EstablishmentFormEdit({
  establishment,
}: EstablishmentFormEditProps) {
  const formMethods = useForm<EstablishmentFormEditType>({
    resolver: zodResolver(EstablishmentFormEditSchema),
    defaultValues: {
      name: establishment.name,
    },
  });

  const { handleSubmit } = formMethods;

  const onSubmit = async (data: EstablishmentFormEditType) => {};

  const handleDeleteEstablishment = async () => {};

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
              onClick={handleDeleteEstablishment}
            >
              Delete
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
