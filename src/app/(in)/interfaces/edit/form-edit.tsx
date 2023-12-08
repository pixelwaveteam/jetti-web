'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Interface } from '@/app/(in)/interfaces/columns';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

const InterfaceFormEditSchema = z.object({
  name: z.string(),
});

type InterfaceFormEditType = z.infer<typeof InterfaceFormEditSchema>;

interface InterfaceFormEditProps {
  interfaceTerminal: Interface;
}

export function InterfaceFormEdit({
  interfaceTerminal,
}: InterfaceFormEditProps) {
  const formMethods = useForm<InterfaceFormEditType>({
    resolver: zodResolver(InterfaceFormEditSchema),
    defaultValues: {
      name: interfaceTerminal.name,
    },
  });

  const { handleSubmit } = formMethods;

  const onSubmit = async (data: InterfaceFormEditType) => {};

  const handleDeleteInterface = async () => {};

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
              onClick={handleDeleteInterface}
            >
              Delete
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
