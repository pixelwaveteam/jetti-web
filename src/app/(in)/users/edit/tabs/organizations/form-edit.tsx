'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
import { Eraser, Trash, Triangle } from 'lucide-react';

const UserFormEditSchema = z.object({
  organizations: z.array(z.array(z.string())),
});

type UserFormEditType = z.infer<typeof UserFormEditSchema>;

interface UserFormEditProps {
  user: User;
}

export function UserOrganizationsFormEdit({ user }: UserFormEditProps) {
  const { toast } = useToast();
  const { setShow } = useContext(SheetContext);
  const { organizations } = useContext(UserContext);

  
  const formMethods = useForm<UserFormEditType>({
    resolver: zodResolver(UserFormEditSchema),
    defaultValues: {
      organizations: []
    }
  });
  
  const { handleSubmit, control, watch } = formMethods;

  const onSubmit = async (data: UserFormEditType) => {
    try {
      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Usuário alterado com sucesso.',
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

  const handleDeleteUserOrganization = async () => {
    try {
      setShow(false);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Usuário excluida com sucesso.',
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

  const [orgs, setOrgs] = useState<string[][]>([]);

  const [organizationsQuery, setOrganizationsQuery] = useState<string | undefined>();

  console.log({orgs})

  const filteredOrganizations = useMemo(() => 
    organizations.filter(({ id, name }) => 
      !orgs.find(org => 
        name === org[1] && id === org[0]
      ) &&
        (organizationsQuery ? name.includes(organizationsQuery) : true)
    ),
    [orgs, organizations, organizationsQuery]
  )


  function handleNewOrg() {
    setOrgs(state => [[], ...state])
  }

  function handleNewOrgChange(val: string, key: string, index: number) {
    setOrgs(state => {
      const fieldValue = [...state];
                              
      const newFieldValueItem = [key, val]
      
      fieldValue.splice(index, 1, newFieldValueItem)
  
      return fieldValue;
    })
  }

  function handleNewOrgClean(index: number) {
    setOrgs(state => {
      const fieldValue = [...state];
                              
      fieldValue.splice(index, 1, [])
  
      return fieldValue;
    })
  }

  function handleNewOrgDelete(index: number) {
    setOrgs(state => {
      const fieldValue = [...state];
                              
      fieldValue.splice(index, 1)
  
      return fieldValue;
    });
  }

  return (
    <div className='space-y-6'>
      <Form {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className='mt-4 space-y-4'>
          {
            orgs.map((org, index) => (
              <Popover key={org[0]} onOpenChange={() => setOrganizationsQuery(undefined)}>
                <PopoverTrigger asChild>
                  <FormItem>
                    <FormControl>
                      <div className='relative'>
                        <Input 
                          placeholder='Escolha a organização'
                          readOnly
                          className='data-[selected="true"]:bg-primary text-primary-foreground cursor-pointer text-center'
                          value={org[1] || ''}
                          data-selected={!!org[1]}
                        />
                        {
                          org[1] && (
                            <button onClick={() => handleNewOrgClean(index)} type='button' className='absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-sm hover:bg-black/5 transition-all'>
                              <Eraser className='w-6 h-6 text-destructive' strokeWidth={2}/>
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
                            .map(organization => (
                              <>
                                <Button 
                                  className='w-full'
                                  key={organization.id}
                                  onClick={() => handleNewOrgChange(organization.name, organization.id, index)}
                                >
                                  {organization.name}
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
                  <Button variant='destructive' className='w-full' size='sm' onClick={() => handleNewOrgDelete(index)}>
                    <Trash className='w-5 h-5 mr-2' strokeWidth={2} /> Remover campo
                  </Button>

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
