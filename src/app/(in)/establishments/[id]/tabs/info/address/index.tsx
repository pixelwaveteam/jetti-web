import { EstablishmentAddressCreateSheet } from '@/app/(in)/establishments/[id]/tabs/info/address/create/create-sheet';
import { EstablishmentAddressEditSheet } from '@/app/(in)/establishments/[id]/tabs/info/address/edit/edit-sheet';
import { EstablishmentAddressData } from '@/app/(in)/establishments/actions/fetch-establishment-address';
import { EmptyState } from '@/components/empty-state';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SheetProvider } from '@/providers/sheet-provider';

interface EstablishmentAddressProps {
  establishmentId: string;
  establishmentAddress?: EstablishmentAddressData;
}

export function EstablishmentAddress({
  establishmentId,
  establishmentAddress,
}: EstablishmentAddressProps) {
  if (!establishmentAddress) {
    return (
      <SheetProvider>
        <EstablishmentAddressCreateSheet establishmentId={establishmentId}>
          <EmptyState label='Criar endereço' />
        </EstablishmentAddressCreateSheet>
      </SheetProvider>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div className='space-y-2'>
            <CardTitle>Endereço</CardTitle>
            <CardDescription>Endereço comercial do local</CardDescription>
          </div>
          <SheetProvider>
            <EstablishmentAddressEditSheet
              establishmentAddress={establishmentAddress}
            />
          </SheetProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className='flex flex-col space-y-4 md:space-x-2'>
          <div className='grid grid-col md:grid-cols-2 space-y-4 md:space-y-0'>
            <div>
              <p className='text-gray-400'>Rua</p>
              <p className='font-semibold'>{establishmentAddress.street}</p>
            </div>
            <div>
              <p className='text-gray-400'>Número</p>
              <p className='font-semibold'>{establishmentAddress.number}</p>
            </div>
          </div>
          <div className='grid grid-col md:grid-cols-2 space-y-4 md:space-y-0'>
            <div>
              <p className='text-gray-400'>Bairro</p>
              <p className='font-semibold'>{establishmentAddress.district}</p>
            </div>
            <div>
              <p className='text-gray-400'>Cidade</p>
              <p className='font-semibold'>{establishmentAddress.city}</p>
            </div>
          </div>
          <div className='grid grid-col md:grid-cols-2 space-y-4 md:space-y-0'>
            <div>
              <p className='text-gray-400'>Estado</p>
              <p className='font-semibold'>{establishmentAddress.state}</p>
            </div>
            <div>
              <p className='text-gray-400'>CEP</p>
              <p className='font-semibold'>{establishmentAddress.zipCode}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
