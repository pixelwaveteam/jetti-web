'use client';

import { useContext, useMemo, useState } from 'react';

import { User } from '@/app/(in)/users/columns';
import { EmptyState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormItem,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { SheetContext } from '@/providers/sheet-provider';
import { UserContext } from '@/providers/user-provider';
import { PopoverArrow } from '@radix-ui/react-popover';
import { Trash, Triangle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { createUserOrganization } from '../../../actions/create-user-oganization';
import { deleteUserOrganization } from '../../../actions/delete-user-organization';

interface CreateUserOrganization {
  organizationId: string;
  userId: string;
}

interface UserFormEditProps {
  user: User;
}

interface UserOrganization  {
  id: string;
  userId: string;
  organizationId: string;
  organizationName: string;
}

type NewUserOrganization = UserOrganization | {
  id: undefined;
  userId: undefined;
  organizationId: undefined;
  organizationName: undefined;
}

export function UserOrganizationsFormEdit({ user: { id: userId, ...user } }: UserFormEditProps) {
  const [organizationsQuery, setOrganizationsQuery] = useState<string | undefined>();
  const [newOrganizations, setNewOrganizations] = useState<NewUserOrganization[]>([]);
  const { toast } = useToast();
  const { setShow } = useContext(SheetContext);
  const { organizations } = useContext(UserContext);

  const userOrganizations = useMemo(() => 
    user.userOrganizations.reduce((acc, userOrganization) => {
      const organization = organizations.find(({ id }) => id === userOrganization.organizationId)

      return organization ? [{...userOrganization, organizationName: organization.name}, ...acc] : acc
    } ,[] as UserOrganization[]), 
    [organizations, user.userOrganizations]
  );

  const orgs = useMemo(() => 
  [...newOrganizations, ...userOrganizations],
  [newOrganizations, userOrganizations]
  )

  const formMethods = useForm();

  const onCreateUserOrganization = async (data: CreateUserOrganization, index: number) => {
    try {
      await createUserOrganization(data);

      handleNewUserOrganizationDelete(index)

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Organização adicionada com sucesso.',
        duration: 5000,
      });
    } catch {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Favor tente novamente mais tarde.',
        duration: 5000,
      });
    }
  };

  function handleNewUserOrganizationDelete(index: number) {
    setNewOrganizations(state => {
      const fieldValue = [...state];
                              
      fieldValue.splice(index, 1)
  
      return fieldValue;
    });
  }

  const handleDeleteUserOrganization = async (id: string) => {
    try {
      await deleteUserOrganization(id);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Organização excluída com sucesso do usuário.',
        duration: 5000,
      });
    } catch(err) {
      if(err instanceof Error && err.message === "User has dependents.") {
        toast({
          variant: 'destructive',
          title: 'Erro',
          description: 'Esse usuário tem registros associados à ele. Para exclui-lo, exclua suas associações antes!',
          duration: 7000,
        });

        setShow(false);

        return
      }

      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Favor tente novamente mais tarde.',
        duration: 5000,
      });
    }
  };

  const filteredOrganizations = useMemo(() => 
    organizations.filter(({ id, name }) => 
      !orgs.find(org => 
        name === org.organizationName && id === org.organizationId
      ) &&
        (organizationsQuery ? name.includes(organizationsQuery) : true)
    ),
    [orgs, organizations, organizationsQuery]
  )

  function handleNewOrg() {
    setNewOrganizations(state => [
      {
      id: undefined, name: undefined, organizationId: undefined, organizationName: undefined, userId: undefined
      },
      ...state
    ])
  }

  return (
    <div className='space-y-6'>
      <Form {...formMethods}>
        <form className='mt-4 space-y-4'>
          {
            orgs.map(({ id, organizationName }, index) => (
              <Popover key={id} onOpenChange={() => setOrganizationsQuery(undefined)}>
                <PopoverTrigger asChild>
                  <FormItem>
                    <FormControl>
                      <div className='relative'>
                        <Input 
                          placeholder='Escolha a organização'
                          readOnly
                          className='data-[selected="true"]:bg-primary text-primary-foreground cursor-pointer text-center'
                          value={organizationName || ''}
                          data-selected={!!organizationName}
                        />
                        {
                          organizationName ? (
                            <button onClick={() => handleDeleteUserOrganization(id)} type='button' className='absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-sm hover:bg-black/5 transition-all'>
                              <Trash className='w-6 h-6 text-destructive' strokeWidth={2}/>
                            </button>
                          ) : (
                            <button onClick={() => handleNewUserOrganizationDelete(index)} type='button' className='absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-sm hover:bg-black/5 transition-all'>
                              <Trash className='w-6 h-6 text-destructive' strokeWidth={2}/>
                            </button>
                          )
                        }
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </PopoverTrigger>
                <PopoverContent onCloseAutoFocus={(e) => e.preventDefault()} sideOffset={-10}>
                  {
                    (!!organizationsQuery || filteredOrganizations.length > 0) && (
                      <Input 
                        placeholder='Busque organizações'
                        value={organizationsQuery}
                        onChange={({ target: { value } }) => setOrganizationsQuery(value)}
                        className='mb-4'
                      />
                    )
                  }
                  {
                    filteredOrganizations.length > 0 ? (
                      <div className='flex flex-col gap-y-2 mb-4 max-h-[25rem] overflow-y-auto'>
                        {
                          filteredOrganizations
                            .map(({ id: organizationId, name: organizationName }) => (
                              <>
                                <Button 
                                  className='w-full'
                                  key={organizationId}
                                  onClick={() => onCreateUserOrganization({ organizationId, userId }, index)}
                                >
                                  {organizationName}
                                </Button>
                              </>
                            ))
                        }
                      </div>
                    ) : (
                      <p className='text-muted-foreground text-center text-sm'>
                        {organizationsQuery ? 'Nenhuma organização encontrada.' : 'Todas organizações foram escolhidas.'}
                      </p>
                    )
                  }
                  <PopoverArrow asChild>
                    <Triangle className='text-border rotate-180 w-14 h-5 fill-popover' strokeWidth={0.5} />
                  </PopoverArrow>
                </PopoverContent>
              </Popover>
            ))
          }

          <EmptyState label='Nova organização' className='py-4' onClick={handleNewOrg} />
        </form>
      </Form>
    </div>
  );
}
