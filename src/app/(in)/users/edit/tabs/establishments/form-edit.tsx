'use client';

import { PopoverArrow } from '@radix-ui/react-popover';
import { Trash, Triangle } from 'lucide-react';
import { useContext, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { EmptyState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { UserContext } from '@/providers/user-provider';

import { createUserEstablishment } from '../../../actions/create-user-establishment';
import { deleteUserEstablishment } from '../../../actions/delete-user-establishment';
import { UserRelations } from '../../edit-sheet';

interface CreateUserEstablishment {
  establishmentId: string;
  userId: string;
}

interface UserFormEditProps {
  user: UserRelations;
}

interface NamedUserEstablishment {
  id: string;
  userId: string;
  establishmentId: string;
  establishmentName: string;
}

type NewUserEstablishment =
  | NamedUserEstablishment
  | {
      id: undefined;
      userId: undefined;
      establishmentId: undefined;
      establishmentName: undefined;
    };

export function UserEstablishmentFormEdit({
  user: { id: userId, ...user },
}: UserFormEditProps) {
  const { toast } = useToast();
  const { establishments } = useContext(UserContext);

  const [establishmentsQuery, setEstablishmentQuery] = useState<
    string | undefined
  >();
  const [newEstablishment, setNewEstablishment] = useState<
    NewUserEstablishment[]
  >([]);

  console.log('user', user);

  const userEstablishment = useMemo(
    () =>
      user.establishments.reduce((acc, rawEstablishment) => {
        const establishment = establishments.find(
          ({ id }) => id === rawEstablishment.establishmentId
        );

        return establishment
          ? [
              { ...rawEstablishment, establishmentName: establishment.name },
              ...acc,
            ]
          : acc;
      }, [] as NamedUserEstablishment[]),
    [establishments, user.establishments]
  );

  const userEstablishments = useMemo(
    () => [...newEstablishment, ...userEstablishment],
    [newEstablishment, userEstablishment]
  );

  const formMethods = useForm();

  const onCreateUserEstablishment = async (
    data: CreateUserEstablishment,
    index: number
  ) => {
    try {
      await createUserEstablishment(data);

      handleNewUserEstablishmentDelete(index);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Establishment adicionado com sucesso.',
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

  function handleNewUserEstablishmentDelete(index: number) {
    setNewEstablishment((state) => {
      const fieldValue = [...state];

      fieldValue.splice(index, 1);

      return fieldValue;
    });
  }

  const handleDeleteUserEstablishment = async (id: string) => {
    try {
      await deleteUserEstablishment(id);

      toast({
        variant: 'default',
        title: 'Sucesso',
        description: 'Establishment excluído com sucesso do usuário.',
        duration: 5000,
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Favor tente novamente mais tarde.',
        duration: 5000,
      });
    }
  };

  const filteredEstablishment = useMemo(
    () =>
      establishments.filter(
        ({ id, name }) =>
          !userEstablishments.find(
            (establishment) =>
              name === establishment.establishmentName &&
              id === establishment.establishmentId
          ) &&
          (establishmentsQuery
            ? String(name).includes(establishmentsQuery)
            : true)
      ),
    [userEstablishments, establishments, establishmentsQuery]
  );

  function handleNewUserEstablishment() {
    setNewEstablishment((state) => [
      {
        id: undefined,
        code: undefined,
        establishmentId: undefined,
        establishmentName: undefined,
        userId: undefined,
      },
      ...state,
    ]);
  }

  return (
    <div className='space-y-6 h-[85vh] overflow-auto mb-6'>
      <Form {...formMethods}>
        <form className='mt-4 space-y-6'>
          {userEstablishments.map(({ id, establishmentName }, index) => (
            <Popover
              key={id}
              onOpenChange={() => setEstablishmentQuery(undefined)}
            >
              <PopoverTrigger asChild>
                <FormItem>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        placeholder='Escolha o establishment'
                        readOnly
                        className='data-[selected="true"]:bg-primary text-primary-foreground cursor-pointer text-center'
                        value={establishmentName || ''}
                        data-selected={!!establishmentName}
                      />
                      {establishmentName ? (
                        <button
                          onClick={() => handleDeleteUserEstablishment(id)}
                          type='button'
                          className='absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-sm hover:bg-black/5 transition-all'
                        >
                          <Trash
                            className='text-destructive'
                            size={20}
                            strokeWidth={2}
                          />
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleNewUserEstablishmentDelete(index)
                          }
                          type='button'
                          className='absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-sm hover:bg-black/5 transition-all'
                        >
                          <Trash
                            className='text-destructive'
                            size={20}
                            strokeWidth={2}
                          />
                        </button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </PopoverTrigger>
              <PopoverContent
                onCloseAutoFocus={(e) => e.preventDefault()}
                sideOffset={-10}
              >
                {(!!establishmentsQuery ||
                  filteredEstablishment.length > 0) && (
                  <Input
                    placeholder='Busque terminais'
                    value={establishmentsQuery}
                    onChange={({ target: { value } }) =>
                      setEstablishmentQuery(value)
                    }
                    className='mb-4'
                  />
                )}
                {filteredEstablishment.length > 0 ? (
                  <div className='flex flex-col gap-y-2 mb-4 max-h-[25rem] overflow-y-auto'>
                    {filteredEstablishment.map(
                      ({ id: establishmentId, name: establishmentCode }) => (
                        <Button
                          className='w-full'
                          key={establishmentId}
                          onClick={() =>
                            onCreateUserEstablishment(
                              { establishmentId, userId },
                              index
                            )
                          }
                        >
                          {establishmentCode}
                        </Button>
                      )
                    )}
                  </div>
                ) : (
                  <p className='text-muted-foreground text-center text-sm'>
                    {establishmentsQuery
                      ? 'Nenhum establishment encontrada.'
                      : 'Todos terminais foram escolhidos.'}
                  </p>
                )}
                <PopoverArrow asChild>
                  <Triangle
                    className='text-border rotate-180 w-14 h-5 fill-popover'
                    strokeWidth={0.5}
                  />
                </PopoverArrow>
              </PopoverContent>
            </Popover>
          ))}

          <EmptyState
            label='Novo establishment'
            className='py-4'
            onClick={handleNewUserEstablishment}
          />
        </form>
      </Form>
    </div>
  );
}
