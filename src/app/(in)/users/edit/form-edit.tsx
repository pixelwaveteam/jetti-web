'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { User } from '@/app/(in)/users/columns';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

const UserFormEditSchema = z.object({
  name: z.string(),
});

type UserFormEditType = z.infer<typeof UserFormEditSchema>;

interface UserFormEditProps {
  user: User;
}

export function UserFormEdit({ user }: UserFormEditProps) {
  const formMethods = useForm<UserFormEditType>({
    resolver: zodResolver(UserFormEditSchema),
    defaultValues: {
      name: user.name,
    },
  });

  const { handleSubmit } = formMethods;

  const onSubmit = async (data: UserFormEditType) => {};

  const handleDeleteUser = async () => {};

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
              onClick={handleDeleteUser}
            >
              Delete
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
