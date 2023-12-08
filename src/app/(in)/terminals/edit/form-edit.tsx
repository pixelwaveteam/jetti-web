'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Terminal } from '@/app/(in)/terminals/columns';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

const TerminalFormEditSchema = z.object({
  name: z.string(),
});

type TerminalFormEditType = z.infer<typeof TerminalFormEditSchema>;

interface TerminalFormEditProps {
  terminal: Terminal;
}

export function TerminalFormEdit({ terminal }: TerminalFormEditProps) {
  const formMethods = useForm<TerminalFormEditType>({
    resolver: zodResolver(TerminalFormEditSchema),
    defaultValues: {
      name: terminal.name,
    },
  });

  const { handleSubmit } = formMethods;

  const onSubmit = async (data: TerminalFormEditType) => {};

  const handleDeleteTerminal = async () => {};

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
              onClick={handleDeleteTerminal}
            >
              Delete
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
