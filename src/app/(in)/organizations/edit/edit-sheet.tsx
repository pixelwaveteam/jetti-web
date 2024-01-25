'use client';

import { Edit } from 'lucide-react';
import { useContext } from 'react';

import { OrganizationFormEdit } from '@/app/(in)/organizations/edit/form-edit';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { SheetContext } from '@/providers/sheet-provider';
import { Organization } from '../actions/fetch-organizations';

interface OrganizationEditSheetProps {
  organization: Organization;
}

export function OrganizationEditSheet({
  organization,
}: OrganizationEditSheetProps) {
  const { show, setShow } = useContext(SheetContext);

  return (
    <Sheet open={show} onOpenChange={setShow}>
      <SheetTrigger asChild>
        <Button variant='ghost' className='flex gap-1' size={'icon'}>
          <Edit size={16} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Alterar Organização</SheetTitle>
        </SheetHeader>
        <OrganizationFormEdit organization={organization} />
      </SheetContent>
    </Sheet>
  );
}
