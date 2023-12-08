'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Organization } from '@/app/(in)/organizations/columns';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';

const OrganizationFormEditSchema = z.object({
  name: z.string(),
});

type OrganizationFormEditType = z.infer<typeof OrganizationFormEditSchema>;

interface OrganizationFormEditProps {
  organization: Organization;
}

export function OrganizationFormEdit({
  organization,
}: OrganizationFormEditProps) {
  const formMethods = useForm<OrganizationFormEditType>({
    resolver: zodResolver(OrganizationFormEditSchema),
    defaultValues: {
      name: organization.name,
    },
  });

  const { handleSubmit } = formMethods;

  const onSubmit = async (data: OrganizationFormEditType) => {};

  const handleDeleteOrganization = async () => {};

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
              onClick={handleDeleteOrganization}
            >
              Delete
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
